**About** 
* User inputs zipcode (5-digit number)
* If zipcode is not valid / empty --> helper text
* If zipcode is valid --> fetch the data
* If there is a fetch error --> error modum pop-up
* Weather info container does not show until a valid zip code is searched 
* Weather info container goes away when a new zipcode is searched (*onChange or onBlur or onFocus* --> when there is a valid new input?? or when user clicks back into input box)
* Match city, temperature, condition, etc info with the appropriate spaces
* Use provided wireframe and ADD:
    - still need a initial state: what it looks like when user gets to page (only header, input box, and button)
    - need to display and hide weather info container
    - need to display and hide fetch error pop-up (error code is its own molecule: message, ability to close out of it, bootstrap modum, color here to portray something is wrong (yellow or red))
    - on key-down // or on-blur for input box, if its not a number then a message needs to pop up and tell them what is needed
    - need to display and hide helper text pop-up for syntax error in input box (under input box, input box turns yellow?? and then green when it is good text input )
    - place holder in input box 
    - calls API data *onSubmit* !!! (don't actually want submit to happen (typical property of submit) but we want the submit to be the event that we are waiting for to fetch the API data (*prevent default???*))
* need to download axios 

**Research**
* axios...async...await
* onChange
* onBlur
* onFocus (onFocusIn, onFocusOut)
* onSubmit
* prevent default
* bootstrap modum pop-up
* local storage


**Javascript Uses**
- show and hide 
- calls for data 
- stores states (
    1. variable: validZipcode / currentZipcode stored --> event listener for onChange that will put it into the API 
    2. hasError = false --> default until fetch error
    3. store good data back: to prevent extra calls, an array of executed API calls/searched, uses zicode as a key and data info is the stored object, checks that the searched zip code is already been cached within a time frame AND until page is refreshed
            - need a time stamp for when a zipcode was added to the local storage (so that we can set a time for it to be erased)
    )

**Create variables**
1. Input Box:
- shows on init 
- takes in a 5 digit zipcode
- turns yellow if anything but a number is typed
- turns green when an appropriate input is typed
- placeholder ex. zipcode
- disappears when submit button is pushed



2. Go button
- shows on init 
- don't actually want submit to happen (prevent default)
- instead: we want the click --> fetch API data OR show saved data that has been stored if the entered zip has already been fetched

3. Header
- always there

4. Weather info container
- not shown on init
- hidden until data is fetched 
- not shown if there is an error from the submit
- goes away when there is a new accurate search 

5. Helper text
- hidden to start
- shows when there is an invalid entry 
- under the input box

6. Error modum
- hidden at init
- pops up when there is a fetch error
- has a way to exit out of error 
- colored to display something is wrong

7. Stored API calls
- define empty array
- fill array with keys of zip codes and the objects are the data retrieved 
- data will be displayed from array if a stored key is called 
- will delete key/object if stored for 2 hours

8. weatherLink

9. weatherInfoState = {
    city: 
    temperature:
    condition:
    other:
}
- define locations for each and then with each fetch, we will update state  

**FUNCTIONALITY**


Function INIT:
    - display input box with placeholder
    - display button 
    - display header
    - helperText, weatherContainer, errorModum = all hidden

Function checkSubmission
    - if submission != number --> helperText = display && input box color = yellow
    - if submission = one of the saved keys --> display data to weatherContainer
    - if submission.length != 4 --> helperText = display && input box color = yellow
    - when correct submission --> input box color = green


Function asyncAxios:
    TRY: 
    - request --> await axios.get(weatherLink)
    - response --> get data (response.data) 
    - setState() with the response
    CATCH:
    - error

Function setState: 
- textContent for city (weatherInfoState.city) = response city (response.city?)
- appendChild to weatherContainer city p

- textContent for temperature (weatherInfoState.temperature) = response temperature in all 3 conversions (response.kelvin, response.fahrenheit, response.celcius ? )
- appendChild to weatherContainer temperature p

- textContent for condition (weatherInfoState.condition) = response condition (response.condition?)
- appendChild to weatherContainer condition p

- textContent for other (weatherInfoState.other) = response other (response.other? (depends on what is found))
- appendChild to weatherContainer condition p



HTML
- div around this organism:
- H1 tag: Weather App
- input box
- button

- div for weather container --> this is where i will append the different boxes 

**Start the program**
weatherLink
cityBox = createElement('p')
temperatureBox = createElement('p')
conditionBox = createElement('p')

init
checkSubmission
asyncAxios 
setState


to do:
1. store state for longer period of time
2. icons to show: switch case
4. fix temp rows to make even sizes
5. change colors of input text box
6. helperText doesn't show up when it should, same with color change