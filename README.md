# <u>Image Labeller</u>

This application allows you to sign up with you personal email or an admin email.
After sign in normal users will be able to label images with different labels
Admin users will be creating users that the normal users will consume to label images.
In the default home route, the users will be able to filter the images based on the lables assigned by the user

Caveat
This is a sample project, the labels created by the admin will be stored in the localstorage, hence all the labels will be accessble on the local browser they were created in.

This caveat can be tackled by migrating to a Supabase postgreSQL DB.

# tl;dr 
<hr>
View the Demo video [Here](https://www.veed.io/view/9958d14f-f9f6-4008-9ba7-d240fcd04822?panel=share)
Test the live website [here](https://classifier-ebon.vercel.app/)

# <u>Getting started</u>

Pre-requisite
- Supabase account for DB and Auth
- Supabase DB Connection URL
- Supabase Anon Key

If you do not want to set these up, you can test it live on [here](https://classifier-ebon.vercel.app/)


Clone the repository locally using the command `git clone https://github.com/deepakr-28/classifier.git`

Create a `.env. file and configure the following variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Run the command `npm run dev` to run the project locally.

# <u>Technical Specs</u>

## Stack
- Frontend - NextJS
- Backend - NextJS APIs
- Database - Supabase postgreSQL
- Authentication - Supabase Auth
- Authorization - JWT
- Images & Labels - Local JSON schema with Browser Localstorage

## Folder Structure
```js
|_components
    |_ Dashboard // render the dashboard for labelling process
    |_ImageView // View and filter images
    |_Navigation // Navbar and other routing options
|_context
    |_AppReducer.js // Global context of the application
|_pages
    |_admin // /admin route
    |_auth // login page
    |_ dashboard // label the images here
|_public
    |_ content // image content and json schema
|_styles
    |_ //global styles
|_utils
    |_ helper // helper functions for client and API
```

## Technical Implementation

The website is built with React while using NextJS as the framework of choice.

### Authentication and Authorization

The authentication and authorization of users is built using supabase
The following files are used to handle the auth.

- /pages/auth.js
- /pages/api/auth/event.js
- /utils/api_helps/authHelpers.js

`auth.js` is a client side route that renders the login form using React.
Every unauthenticated user is redirected to this page.

`/auth/event.js` file handles scenarios like `signin`, `signout`, `signup`.

The `authHelpers.js` are helper methods that verify tokens and user permissions like `isAdmin` etc.
 
### Server side routes (Endpoints)

The following endpoints are implemented currently

- /signup
    |_ createUser()
- /signin
    |_ searchUser
- /signout
- /verify
    |_searchUser()

Each route performs certain database operations, these operations are carried to ensure the user is an Admin. 
The database calls can however be removed if we store roles in the JWT using supabase.

The routes send differnt error codes to the frontend in case of auth failure.

401 -> Token expired
404 -> user not found
400 -> Generic Errors

200 -> Success

### React state management

The state management is built using `useContext hook`
The following states are initialise in the `AppReducer.js` file

```js
export const authState = {isAuthenticated: false};
export const filterState = {uniqueFilters: [], selectedFilters: []}
```

The authstate only stores if the user is authenticated or not
The filter state stores the unique filters created by Admin and the selected filters during the filtering process on the home `/` route.

The following reducers handle the state

```js
switch(action.type){
case "AUTHENTICATED":{
        // updates user status to isAuthenticated
    }
    case "SIGNOUT":{
        // updates user authentications status to false, while updating other fields too
    }
    case "UNIQUE_FILTERS":{
        // Store all labels created by the admin
    }
    case "UPDATE_SELECTED_FILTERS":{
        // update selected filter array
    }
    default:
        return state
}
```

### Client side routes

1) `/`
The homeroute, users can filter and view the images here. Selected filters are updated in the global state.

Every time a filter is selected, a action is dispatched to the reducer that updates the global context of our application.

2) `/auth`
The auth route shows the login page and redirects user to `/confirm` or `/` homepage.

Once the user is authenticated successfully the global auth state is updated with `isAuthenticate=true`.

3) `/confirm`
The confirm route is visible to people who create a new account, they have to verify their email before signing in, hence this page is shown.

4) `/admin`
This page is accessible only by the admin, they can create the labels here
The localStorage is updated from there, the same localStorage values are used in other routes

Multiple actions are performed here, most of the localstorage updates happen here and the `/dashboard` route. In the admin route a localStorage Array is updated with all unique lables the admin creates.

5) `/dashboard`
This page is accessible by both the admin and the normal user, all the lables that are assigned to the images, are stores in a local state for it to be accessible easily even after loggin out

Multiple actions are dispatched from this route to the global context. Everytime a user updates the image label, we disptach an action for it to be updated in the global context


### Local JSON Schema

`/public/content/schema.json`

```json
{
  "images": [
    {
      "img_url": "/content/cat1.jpg",
      "img_labels": [],
      "img_category": "Cat",
      "id": "0"
    }, ...other_image_objects]
}

```
This is a single image object that is stored in the localStorage.
This schema is used to get the skeleton and images. They are stored in the localstorage and then the values are updated in the localStorage, there are no write oprations on this schema. All operations are performed on the localstorage instance of the same.

# <u>User Specs</u>

## Authentication
The normal users can create their account, verify their emails and start labelling images

The token expires in 60 minutes, hence they'll have to sign in again after that

## Creating Labels
The `admin`, `auth`, `dashboard`, `index` pages render our application
Each route is broken down into multiple components for reuseability

The admin is allows to create and delete new labels in the `/admin` route

![](https://i.ibb.co/yhkFsNG/Screenshot-2023-04-02-153405.png)



As you can see here multiple tags are created by the admin user, these will be visible on our home `/` route.
An admin can click on any label to delete it.

But since we haven't assigned it, even if we select the filters the images won't be filterd
![](https://i.ibb.co/DQQjF4n/Screenshot-2023-04-02-153820.png)

As you can see here, no images are shown

We will move to our `/dashboard` route to assign the labels

All the images are renderd here, and the labels that are created will be accessbile via a dropdown, users can select the dropdown and the label will be assigned to that image.
![](https://i.ibb.co/z2nSYhs/Screenshot-2023-04-02-153924.png)

![](https://i.ibb.co/myqHZ78/Screenshot-2023-04-02-153955.png)

Here the **cat** label will be assigned to this image, similary we can select for the dog and horse images.
To delete a label, we can simply click on those.


If we go back to our home `/` route, the images will be accessible when we try to filter them 
![](https://i.ibb.co/mv0D0mq/Screenshot-2023-04-02-153905.png)


The states are preserved when we move between different routes. 
Since we are using a localstorage to store the labels, this project is for test purpose, since the labels created by the admin will be in the same machine.

## Demo

View the Demo video [Here](https://www.veed.io/view/9958d14f-f9f6-4008-9ba7-d240fcd04822?panel=share)

Test the live website [here](https://classifier-ebon.vercel.app/)