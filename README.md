# BTempo

This app shows the current weather for your location and forecast for the next 24 hours. Created for a coding challenge.
The api used in this project is [Open Weather Map](https://openweathermap.org/api).

![React Native](https://img.shields.io/static/v1?label=React-Native&message=v0.68.0&color=6D21B4&style=for-the-badge&logo=react)   ![Expo](https://img.shields.io/static/v1?label=Expo&message=v44.0.6&color=EEEEEE&style=for-the-badge&logo=expo)   ![Typescript](https://img.shields.io/static/v1?label=Typescript&message=v4.4.4&color=2184B4&style=for-the-badge&logo=typescript)

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

---

## Setup & Run Locally

### Clone the project

```bash
  git clone https://github.com/DanielGaspar-Tru/BTempo.git
```

### Go to the project directory

```bash
  cd BTempo
```

### Install dependencies

```bash
  yarn
  cd ios && pod install && cd ..
```

`If you're having trouble installing dependencies, you may need to update the pod repos before installing the dependencies.`

```bash
  pod repo update
```

### Create the .env file

- create the .env file on your project root directory, using .env.example as a template, to setup your OpenMaps API Key. You will need to sign up and get one in case you don't have already. https://home.openweathermap.org/users/sign_up

### Start the server

```bash
  yarn start
```

### Run

Run the mobile application with `yarn ios` or `yarn android`;

---

## Tech Stack

- React Native
- Expo [Bare Workflow]
- Typescript

#### Linter Tools

- eslint
- prettier

#### Testing

- Jest
- Enzyme

#### Libs

- react-navigation
- expo-location
- lottie
- react-native-reanimated
- axios

## API

[OpenWeather Api](https://openweathermap.org/api)

- Endpoint [onecall](https://openweathermap.org/api/one-call-api)

## Project Structure

- services: api and axios setup
- pages: application screens
- hooks: custom hook responsible for weather data
- context: custom location context responsible for permissions and location
- components: application components
- utils: utility functions for app and tests

- \_mocks: mock data
- \_tests: app integration tests

## License

Licensed for users and contributors under MIT license.
[MIT](https://choosealicense.com/licenses/mit/)
