///////////////////////
//SETS URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
const deployedURL = "https://project-2-backend.herokuapp.com";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

///////////////////////
//GLOBAL VARIABLES
//////////////////////
const $btnStudent = $('#btn-students');
const $btnGuardian = $('#btn-guardians');
const $table = $('.table-list-studentguardian');

const $btnCreateStudentSave = $('#btn-student-create-save');
const $btnCreateGuardianSave = $('#btn-guardian-create-save');
const $btnSelectGuardianModal = $('#guardianModal');

//////////////////////////////
//FUNCTIONS
/////////////////////////////

const populateStudentTable = async () => {
    //empties table before populating
    $table.empty()

    //API CALL USING ASYNC/AWAIT
    const response = await fetch(`${URL}/students`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'x-requested-with': ''
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

        //append a menu from bootstrap with edit button and delete button
        const $liDropdown = createDropdownMenu(student);
        //append menu to ulEntry
        $ulEntry.append($liDropdown); 

        const $liNameEntry = $('<li>').text(`${student.firstName} ${student.lastName}`);
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
        

        const $liNameEntry = $('<li>').text(`${guardian.firstName} ${guardian.lastName}`);
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
        //on Click to edit each item
        $aEdit.on('click', (event) => {
            console.log('edit')
            console.log('id:' ,userObject);
            editUser(userObject)
        })

        //create items and set on clicks
        const $aDelete = $('<a>').attr('class',"dropdown-item");
        $aDelete.attr('href',"#");
        $aDelete.text('Delete');
        //On Click to delete each item
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
async function deleteUser(userObject) {
    //checks whether student or guardian
    const route = (userObject) => {
        if (userObject.hasOwnProperty('students') ){
            return "guardians"
        }else {
            return "students"
        }
    }

    //delete from database
    const userId = userObject._id;
    const userURI = `${URL}/${route(userObject)}/${userId}`;
    console.log('userURI',userURI)
    //API CALL USING ASYNC/AWAIT
    const response = await fetch(`${URL}/${route(userObject)}/${userId}`, {
        method: "delete"
    })
    
    //repopulates student or guardian table
    $table.empty()
    if(route == 'guardians') {
        populateGuardianTable()
    }else {
        populateStudentTable()
    }
}

//TODO: write logic for edit user
async function editUser(userObject) {
    console.log('userObject in edit: ', userObject)

    //checks whether student or guardian
    const route = (userObject) => {
        if (userObject.hasOwnProperty('students') ){
            return "guardians"
        }else {
            return "students"
        }
    }

    const updatedUser = () => {
        if(route == 'students'){
            return updateStudent(userObject)
        }else {
            return updateGuardian(userObject)
        }
    }

    console.log(updatedUser)

    // //edit in database
    // const userId = userObject._id;
    // const userURI = `${URL}/${route(userObject)}/${userId}`;
    // console.log('userURI',userURI)
    // //API CALL USING ASYNC/AWAIT
    // const response = await fetch(`${URL}/${route(userObject)}/${userId}`, {
    //     method: "put",
    //     headers: {
    //         "Content-Type":"application/json"
    //     },
    //     body: JSON.stringify(updatedUser)
    // })


    // //repopulates student or guardian table
    // $table.empty()
    // if(route == 'guardians') {
    //     populateGuardianTable()
    // }else {
    //     populateStudentTable()
    // }
}

//TODO: write logic for update student
function updateStudent(userObject) {
    //TODO: write logic for edit user
    console.log('logic for edit student goes here')
}

//TODO: write logic for update guardian
function updateGuardian(userObject) {
    console.log('logic for edit guardian goes here')

}

//TODO: write logic for create student 
async function createStudent() {
    //bring in variables from form
    const $firstName = $('#student-firstName');
    const $lastName = $('#student-lastName');
    const $dateOfBirth =$('#student-dateOfBirth');
    const $rank = $('#student-rank');
    const $phoneNumber = $('#student-PhoneNumber');
    const $email = $('#student-email');
    const $address = $('#student-address');
    //TODO: make plan options radio buttons
    const $plan = $('#student-plan');
    const today = new Date()
    //TODO: parse date to MM/DD/YYYY format
    const startDate = (today.getMonth()+1)+'/'+today.getDate()+ '/' + today.getFullYear();
    //TODO: make renewal automatically based on plan selected
    const renewalDate1yr =  (today.getMonth()+1)+'/'+today.getDate()+ '/' + (today.getFullYear() + 1);
    const renewealDate6mth = (today.getMonth()+1 + 6)+'/'+today.getDate()+ '/' + today.getFullYear();
    const renewealDate1mth = (today.getMonth()+1 + 1)+'/'+today.getDate()+ '/' + today.getFullYear();
    //TODO: make monthly fee automatcially base on plan selected
    const monthlyfee1yr = 75;
    const monthlyfee6mth = 85;
    const monthlyfee1mth = 90;

    //create student object
    const newStudent = {
        firstName: $firstName.val(),
        lastName: $lastName.val(),
        dateOfBirth: $dateOfBirth.val(),
        rank: $rank.val(),
        contactInfo: {
            phoneNumber: $phoneNumber.val(),
            email: $email.val(),
            address: $address.val(),
        },
        billing: {
            plan: Number($plan.val()),
            startDate: startDate,
            renewalDate: renewalDate1yr,
            monthlyDueDate: today.getDate() ,
            monthlyFee: monthlyfee1yr ,
            pastDueBalance: 0 ,
            currentBalance: 0 ,
        }
    }
    console.log('NEW STUDENT: ', newStudent);

    //API CALL USING ASYNC/AWAIT
    const response = await fetch(`${URL}/students`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStudent)
    });

    //repopulate table
    $table.empty()
    populateStudentTable();

    //TODO: figure out how to close modal
    const $modal = $('createStudentModal');
    $modal.close()
}


async function createGuardian() {
    const $firstName = $('#guardian-firstName');
    const $lastName = $('#guardian-lastName');
    const $phoneNumber = $('#guardian-PhoneNumber');
    const $email = $('#guardian-email');
    const $address = $('#guardian-address');
    const $student1 = $('#guardian-student1');
    const $student2 = $('#guardian-student2');
    const $student3 = $('#guardian-student3');
    const studentsInputs = [$student1.val(), $student2.val(),$student3.val()];


    //create guardian object
    const newGuardian = {
        firstName: $firstName.val(),
        lastName: $lastName.val(),
        contactInfo: {
            phoneNumber: $phoneNumber.val(),
            email: $email.val(),
            address: $address.val(),
        },
        students: []
    }
//TODO: if student does not exist, create error popup and state student does not exist
//TODO: make sure students inputed are lowercase
    for(let i = 0; i < studentsInputs.length; i++){
        if(studentsInputs[i] != ''){
            console.log('push student to object')
            newGuardian.students.push(studentsInputs[i]);
        }
    }

    console.log('NEW Guardain: ', newGuardian);

    //API CALL USING ASYNC/AWAIT
    const response = await fetch(`${URL}/guardians`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGuardian)
    });

    //repopulate table
    $table.empty()
    populateGuardianTable();

    // const $modal = $('createStudentModal');
    // $modal.close()
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
    console.log('clicked guardian');
    populateGuardianTable();
});
$btnStudent.on('click', (event) => {
    console.log('clicked student');
    populateStudentTable();
});

$btnCreateStudentSave.on('click', (event) => {
    createStudent();
})

$btnCreateGuardianSave.on('click', (event) => {
    console.log('clicked createGuardian');
    createGuardian();
})
