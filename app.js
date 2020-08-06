///////////////////////
//SETS URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
//TODO: update deployed URL
const deployedURL = "https://project-2-backend.herokuapp.com";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

///////////////////////
//GLOBAL VARIABLES
//////////////////////
const $btnStudent = $('#student')
const $btnGuardian = $('#guardian')
const $table = $('.table-list-studentguardian');

//////////////////////////////
//FUNCTIONS
/////////////////////////////


const populateStudentTable = async () => {
    //empties table before populating
    $table.empty()

    const anywhereHeroku = "https://cors-anywhere.herokuapp.com"

    //API CALL USING ASYNC/AWAIT
    const response = await fetch(`${URL}/students`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            "origin": "*"
        }
    });
    const data = await response.json();
    console.log('data: ',data);
    
    //Create ul where entries will be appended to
    const $ul = $('<ul>').attr('class','list-students-entries');
    $table.append($ul);

    //create li for KEYS HEADER and append to ul
    const $liStudentsHeader = $('<li>').attr('class','listitem-studentkeys-holder');
    $ul.append($liStudentsHeader);

    //create ul for KEYS and append to liStudentsHeader
    const $ulStudentKeys = $('<ul>').attr('class','list-student-entry-keys');
    $liStudentsHeader.append($ulStudentKeys)

    //create li KEYS and append to ulStudentEntries
    const $liNameKey = $('<li>').text('NAME');
    const $liAgeKey = $('<li>').text('AGE');
    const $liRankKey = $('<li>').text('RANK');
    const $liMonthlyFeeKey = $('<li>').text('MONTHLY FEE');
    const $liDueDateKey = $('<li>').text('MONTHLY DUE DAY');
    $ulStudentKeys.append($liNameKey);
    $ulStudentKeys.append($liAgeKey);
    $ulStudentKeys.append($liRankKey);
    $ulStudentKeys.append($liMonthlyFeeKey);
    $ulStudentKeys.append($liDueDateKey);


    //POPULATE TABLE WITH RETRIEVED DATA
    data.forEach((student) => {
        console.log('student: ',student)
        const $liEntry = $('<li>')
        $ul.append($liEntry)

        const $ulEntry = $('<ul>')
        $liEntry.append($ulEntry)

        // //append a menu from bootstrap with edit button and delete button
        // const $liDropdown = createDropdownMenu(student);
        // //append menu to ulEntry
        // $ulEntry.append($liDropdown); 

        const $liNameEntry = $('<li>').text(student.firstName);
        const $liAgeEntry = $('<li>').text(getAge(student.dateOfBirth));
        const $liRankEntry = $('<li>').text(student.rank);
        const $liMonthlyFeeEntry = $('<li>').text(student.billing.monthlyFee);
        const $liDueDateEntry = $('<li>').text(student.billing.monthlyDueDate);
        $ulEntry.append($liNameEntry);
        $ulEntry.append($liAgeEntry);
        $ulEntry.append($liRankEntry);
        $ulEntry.append($liMonthlyFeeEntry);
        $ulEntry.append($liDueDateEntry);
    });
}

//TODO: fix function
function getAge (dateOfBirth) {
    return dateOfBirth;
}


const populateGuardianTable = async () => {
    //empties table before populating
    $table.empty()

    //API CALL USING ASYNC/AWAIT
    const response = await fetch(`${URL}/guardians`);
    const data = await response.json();
    console.log('data: ',data);
    
    //Create ul where entries will be appended to
    const $ul = $('<ul>').attr('class','list-guardians-entries');
    $table.append($ul);

    //create li for KEYS HEADER and append to ul
    const $liGuardiansHeader = $('<li>').attr('class','listitem-guardiankeys-holder');
    $ul.append($liGuardiansHeader);

    //create ul for KEYS and append to liGuardiansHeader
    const $ulGuardianKeys = $('<ul>').attr('class','list-guardian-entry-keys');
    $liGuardiansHeader.append($ulGuardianKeys)

    //create li KEYS and append to ulGuardianEntries
    const $liNameKey = $('<li>').text('NAME');
    const $liNumberKey = $('<li>').text('NUMBER');
    const $liEmailKey = $('<li>').text('EMAIL');
    const $liAddressKey = $('<li>').text('ADDRESS');
    $ulGuardianKeys.append($liNameKey);
    $ulGuardianKeys.append($liNumberKey);
    $ulGuardianKeys.append($liEmailKey);
    $ulGuardianKeys.append($liAddressKey);


    //POPULATE TABLE WITH RETRIEVED DATA
    data.forEach((guardian) => {
        console.log('guardian: ',guardian);
        const $liEntry = $('<li>');
        $ul.append($liEntry);

        const $ulEntry = $('<ul>');
        $liEntry.append($ulEntry);

        //append a menu from bootstrap with edit button and delete button
        const $liDropdown = createDropdownMenu(guardian);
        //append menu to ulEntry
        $ulEntry.append($liDropdown);        
        

        const $liNameEntry = $('<li>').text(`${guardian.firstName} + ${guardian.lastName}`);
        const $liNumberEntry = $('<li>').text(getAge(guardian.contactInfo.phoneNumber));
        const $liEmailEntry = $('<li>').text(guardian.contactInfo.email);
        const $liAddressEntry = $('<li>').text(guardian.contactInfo.address);
        $ulEntry.append($liNameEntry);
        $ulEntry.append($liNumberEntry);
        $ulEntry.append($liEmailEntry);
        $ulEntry.append($liAddressEntry);
    });
}

//TODO: refactor and complete this function so you can add guardians to students and vise versa
// function populateGuardianEntry(guardian) {
//     return
// }

//create a menu from bootstrap with edit button and delete button
function createDropdownMenu (userObject) {
    const $liDropdown = $('<li>');

    const $divDropdown = $('<div>').attr('class',"dropdown");
        $liDropdown.append($divDropdown);
        const $btnDropdown = $('<button>').attr('class',"btn btn-secondary dropdown-toggle")
        $btnDropdown.attr('type', "button");
        $btnDropdown.attr('id',"dropdownMenuButton")
        $btnDropdown.attr('data-toggle', "dropdown")
        $btnDropdown.attr('aria-haspopup', "true")
        $btnDropdown.attr('aria-expanded', "false")
        // const $hamburgerIcon = $('<i>').attr('class',"fas fa-bars");
        //TODO: figure out how to get hamburger icon as text for dropdown
        $btnDropdown.text('');
        $divDropdown.append($btnDropdown);
        const $divOptions = $('<div>').attr('class',"dropdown-menu");
        $divOptions.attr('aria-labelledby',"dropdownMenuButton");
        $divDropdown.append($divOptions);

        //create items and set on clicks
        const $aEdit = $('<a>').attr('class',"dropdown-item");
        $aEdit.attr('href',"#");
        $aEdit.text("Edit");
        $aEdit.on('click', (event) => {
            console.log('edit')
            console.log('id:' ,userObject);
        })

        const $aDelete = $('<a>').attr('class',"dropdown-item");
        $aDelete.attr('href',"#");
        $aDelete.text('Delete');
        $aDelete.on('click', (event) => {
            console.log('delete')
            console.log('id:', userObject);
            deleteUser(userObject);
        })

        $divOptions.append($aEdit);
        $divOptions.append($aDelete);
        
    return $liDropdown;
}

//deletes either student or guardian
//TODO: REMOVE REFERNCE ID FROM ACTIVE STUDENT OR GUARDIAN!!
async function deleteUser(userObject) {
    console.log('logic for delete user goes here')
    console.log('userObject in delete: ', userObject)
    const route = (userObject) => {
        if (userObject.hasOwnProperty('students') ){
            console.log('This is a guardian')
            const route = "/guardians";
            const studentsArr = ""
            //get route
            //get studentsArr
            return "guardians"
        }else {
            console.log('This is a student')
            //get route
            //get guardiansArr
            return "students"
        }
    }
    const userId = userObject._id;
    console.log('id', userId);
    
    const userURI = `${URL}/${route(userObject)}/${userId}`;
    // const userreferenceArr = 
    console.log('userURI',userURI)
    //API CALL USING ASYNC/AWAIT
    const response = await fetch(`${URL}/${route(userObject)}/${userId}`, {
        method: "delete"
    })
    console.log('deleted data', response);
    
    //with userid, 

    $table.empty()
    if(route == 'guardians') {
        populateGuardianTable()
    }else {
        populateStudentTable()
    }
}

function editUser(userObject) {
    //TODO: write logic for edit user
    console.log('logic for edit student goes here')
}



////////////////////////////////
// Main Application Logic
////////////////////////////////

//TODO: Activate student button on opening program
//when app is opened up - student radio button is automatically selected and looks active
//guardian button will look disabled
//student get all function is called to display all students in a table
populateStudentTable();

//when guardian button is selected, table disappears and guardian info is displayed in a table
//student button looks disabled and guardian button is active
$btnGuardian.on('click', (event) => {
    populateGuardianTable();
});
$btnStudent.on('click', (event) => {
    populateStudentTable();
});
