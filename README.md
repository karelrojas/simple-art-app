# Simple Art App
### Created by Karel Rojas Requena

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Website
This is a basic website for users to draw and upload their own pictures, where they can be shared and viewed by other users. It features a login and signup process so users can
keep track of their posts and how well received they are by others.

## Development Process
This website was programmed using [React](https://react.dev/) for the front end, Python and [Flask](https://flask.palletsprojects.com/en/2.3.x/) for the back end, 
and [MariaDB](https://mariadb.org/) as the database. [React-canvas-draw](https://github.com/embiem/react-canvas-draw) is the component used to allow users to draw.

Initially, the website would simply be a place to draw and anonymously upload drawings for others to view. Since users needed to see other user's drawings, a database was required to save that information. Shortly after, a login system was implemented which eliminated anonymity and changed the design of the website. Now that the website was oriented towards user creation and sharing, inspiration was taken from a handful of social media websites. It was then decided that users would be able to keep track of their posts and see how well they are doing.

## Development Issues
### Image Data
One of the biggest issues was trying to compress the canvas image so it wouldn't take up too much space when uploaded to the database. The react-canvas-draw component has a function
that saves the canvas image as a **data url**, which grows in size the more complex the drawing becomes. Using some of the functions provided in the responses to [this StackOverflow post](https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript), I attempted to convert the data url into a **Blob** object so the image wouldn't need to use
as much space. Displaying the images would also be simple, as I would have been able to convert the Blobs into Blob links that can be viewed when the client requests the image.

I was able to get as far as creating the Blob object, however since I am using Flask to act as the server, the Blob object changes into a FileStorage object, which to
my knowledge is something specific to Flask. Since I have been working on this project for longer than expected, I ultimately decided to simple send the image data url itself directly to the database.
It is clearly not an efficent way to store images or image data, but I did not want to stay on this issue forever.

### Login Security
Currently, the login system is not secure at all. Passwords are not encrypted or hashed and are simply stored as plaintext. There is also no proper authentication token once login 
is verified, and the current system uses numerical flags to determine verification. I would like to implement a proper and secure method of login and verification in the future, but 
the main focus of this project was to design an art app, so a simpler login system is needed for now.

