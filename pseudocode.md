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