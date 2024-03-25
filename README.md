# TikTok User Stats API

This Node.js application serves as an API to retrieve statistics of TikTok users. It utilizes Express.js for handling HTTP requests, Axios for making HTTP requests to TikTok's website, Cheerio for parsing HTML content, and HTTPS module for secure server communication.

## Setup

1. **Clone the Repository**: Clone this repository to your local machine.

2. **Install Dependencies**: Make sure you have Node.js installed. Navigate to the cloned directory in your terminal and run `npm install` to install the required dependencies.

3. **Generate SSL Certificates**: This application runs on HTTPS. Make sure you have SSL certificates for your domain. Update the paths of the SSL certificates (`privkey.pem` and `fullchain.pem`) in the `server.js` file.

## Running the Server

To start the server, run: node server.js



The server will start listening for incoming HTTPS requests on port `443`.

## Making Requests

You can make requests to the server endpoint to retrieve TikTok user statistics. The endpoint is:

https://your-domain.com/?userid={TikTokUsername}



Replace `your-domain.com` with your actual domain name where the server is hosted, and `{TikTokUsername}` with the username of the TikTok user whose statistics you want to retrieve.

For example:
https://your-domain.com/?userid=exampleuser

## Response

The server will respond with JSON data containing various statistics of the requested TikTok user, including:

- `uniqueId`: The unique ID of the user.
- `avatarLarger`: URL of the user's larger avatar image.
- `followerCount`: Number of followers.
- `followingCount`: Number of accounts the user is following.
- `heartCount`: Total number of hearts received on videos.
- `videoCount`: Total number of videos uploaded by the user.
- `diggCount`: Total number of likes received on videos.
- `friendCount`: Total number of friends.

#LIVE VERSION 
THIS LIVE VERSION MAY NOT WORKING AFTER SOMETIME https://tiktokcount.kozow.com/?userid=exampleuser

If the requested user is not found or if there is an error during the process, appropriate error messages will be returned.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



