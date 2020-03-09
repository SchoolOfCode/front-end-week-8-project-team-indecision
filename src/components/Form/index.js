import React from 'react';
import TextInputField from '../TextInputField/index';
import DropdownInputField from '../DropdownInputField/index';
import DatePicker from '../DatePicker/index';
import TextAreaInput from '../TextAreaInput/index';

//------------PLAN-----------------------------

//TODO: Wrap FormInputField components in a <form></form> tag and have onSubmit event tied to <button type="submit"></button> at end

//TODO: Add input field components for each form field listed below
/*
**Form fields - both:**
-First name (optional)
-Last name (optional)
-Organisation (optional)
-Contact email 
-Contact phone number 
-Picture
**Form fields - specific for planters:**
-Tree species -> Dropdown list!!
-Date planted 
**Form fields - specific for requesters:**
-Comment (for details about the requested area)
*/

//TODO: Need conditional rendering - if person selects planter, only display planter fields, and for requesters, only display requester fields

//TODO: Need a place for the user to upload a photo!

//TODO: Correctly label in line with accessibility guidelines for screen readers

//--------------CODE------------------------------

function Form() {
  return (
    <form>
      <label for="fName">First name:</label>
      <TextInputField placeholder={} name={'fname'} value={} />

      <label for="lName">Last Name:</label>
      <TextInputField placeholder={} name={'lname'} value={} />

      <label for="org">Organisation:</label>
      <TextInputField placeholder={} name={'org'} value={} />

      <label for="email">Email:</label>
      <TextInputField placeholder={} name={'email'} value={} />

      <label for="phone">Telephone number:</label>
      <TextInputField placeholder={} name={'phone'} value={} />

      <label for="species">Tree species:</label>
      <DropdownInputField placeholder={} name={'species'} value={} />

      <label for="datePlanted">Date planted:</label>
      <DatePicker placeholder={} name={'datePlanted'} value={} />

      <label for="comment">Details:</label>
      <TextAreaInput placeholder={} name={'comment'} value={} />

      <label for="treePic">Upload photo:</label>
      <TextInputField
        placeholder={'This will be replaced by snazzy image uploader!'}
        name={'treePic'}
        value={}
      />

      <input type="submit" value="submit" />
    </form>
  );
}

export default Form;
