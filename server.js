const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 8000;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/tiktokcount.kozow.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/tiktokcount.kozow.com/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

app.get('/', (req, res) => {
  const userId = req.query.userid;
  if (!userId) {
    return res.status(400).send('User ID is required.');
  }

  axios.get(`https://www.tiktok.com/@${userId}`)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract JSON data from script tag with id __UNIVERSAL_DATA_FOR_REHYDRATION__
      const scriptContent = $(`#__UNIVERSAL_DATA_FOR_REHYDRATION__`).html();
      if (scriptContent) {
        const jsonData = JSON.parse(scriptContent);

        // Extract user information
        const userInfo = jsonData['__DEFAULT_SCOPE__']['webapp.user-detail'].userInfo;
        if (userInfo) {
          const stats = userInfo.stats;
          const user = userInfo.user;
          const { uniqueId, avatarLarger } = user;

          // Respond with user details
          const userData = {
            uniqueId,
            avatarLarger,
            followerCount: stats.followerCount,
            followingCount: stats.followingCount,
            heartCount: stats.heartCount,
            videoCount: stats.videoCount,
            diggCount: stats.diggCount,
            friendCount: stats.friendCount
          };
          res.json(userData);
        } else {
          res.status(404).send('User information not found.');
        }
      } else {
        res.status(404).send('Script tag with id __UNIVERSAL_DATA_FOR_REHYDRATION__ not found.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
