///////////////////////

//SETS URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
const deployedURL = null;
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
    const $aEdit = $('<button>').attr('class',"dropdown-item");
    $aEdit.attr('data-toggle', 'modal');
    $aEdit.attr('data-target', '#edit-modal');
    $aEdit.text("Edit");
    //on Click to edit each item
    $aEdit.on('click', (event) => {
        debugger;
        console.log('edit')

        editUser(userObject)
    })

    //create items and set on clicks
    const $aDelete = $('<button>').attr('class',"dropdown-item");
    $aDelete.text('Delete');
    //On Click to delete each item
    $aDelete.on('click', (event) => {
        debugger;
        console.log('delete')
        console.log('user object:', userObject);
        deleteUser(userObject);
    })

    $divOptions.append($aEdit);
    $divOptions.append($aDelete);
        
    return $liDropdown;
}


//--------DELETE USER--------------

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


//---------EDIT USER----------------
//TODO: write logic for edit user
function editUser(userObject) {
    debugger;
    //checks whether student or guardian
    const isGaurdian = () => {
        if (userObject.hasOwnProperty('students')) {
            return true
        }else {
            return false
        }
    }

    const initalizeModal = () => {
        const {
            firstName,
            lastName,
            dateOfBirth,
            contactInfo,
            // different based on type, may be undefined.
            rank,
        } = userObject;
        const {
            phoneNumber,
            email,
            address,
        } = contactInfo;
        // personal info
        const $firstNameInput = $('#first-name').val(firstName)
        const $lastNameInput = $('#last-name').val(lastName)
        
        // contact info
        const $phoneNumberInput = $('#edit-phone-number').val(phoneNumber)
        const $emailInput = $('#edit-email').val(email)
        const $addressInput = $('#edit-address').val(address)


        if (isGaurdian()) {
            const $modalTitle = $('#edit-modal-title').html('Edit Guardian')

            const $studentRankInput = $('#edit-student-rank').hide()
            const $studentRankLabel = $('label[for="edit-student-rank"]').hide()
            const $studentBirthInput = $('#date-of-birth').hide()
            const $studentBirthLabel = $('label[for="date-of-birth"]').hide()
        } else {
            const $modalTitle = $('#edit-modal-title').html('Edit Student')

            const $studentRankInput = $('#edit-student-rank').val(rank).show()
            const $dateOfBirthInput = $('#date-of-birth').val(dateOfBirth).show()
            const $studentRankLabel = $('label[for="edit-student-rank"]').show()
            const $studentBirthLabel = $('label[for="date-of-birth"]').show()
        }
    };


    // create on click listener for `update-user`
    // when clicked if userObject is student
        // pull off student input values and submit using api
        // else pull off gardian alues and submit using api
    const $btnUpdateUser = $('#update-user');

    //To prevent listener from firing off multiple times, event listener must be turned off
    // https://stackoverflow.com/a/26602984
    $('#update-user').off('click')
    $btnUpdateUser.on('click', (event) => {
        let updateUserRoute = `${URL}/`
        const firstName = $('#first-name').val()
        const lastName = $('#last-name').val()
        
        // contact info
        const phoneNumber = $('#edit-phone-number').val()
        const email = $('#edit-email').val()
        const address = $('#edit-address').val()


        const updatedObj = {
            firstName,
            lastName,
            contactInfo: {
                phoneNumber,
                email,
                address
            }
        }

        if (isGaurdian()) {
            updateUserRoute += `guardians/${userObject._id}`

        } else {
            updateUserRoute += `students/${userObject._id}`
            studentRank = $('#edit-student-rank').val()
            dateOfBirth = $('#date-of-birth').val()

            updatedObj.rank = studentRank;
            updatedObj.dateOfBirth = dateOfBirth;

        }
        
        fetch(updateUserRoute, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObj)
        }).catch((err) => {
            alert(`an error has occured adding user ${err}`)
        });

        //repopulates student or guardian table
        $table.empty()
        if(isGaurdian()) {
            populateGuardianTable()
        }else {
            populateStudentTable()
        }

        const $modal = $('#edit-modal')
        $modal.modal('hide');
    })

    initalizeModal()

}

//TODO: write logic for update student
function updateStudent(userObject, route) {
    //TODO: write logic for edit user
    console.log('logic for edit student goes here');
    //populate modal with student information
    //user edits student info
    //on save, the object gets updated.

    createModal(userObject._id, route);

}

//TODO: write logic for update guardian
function updateGuardian(userObject, route) {
    console.log('logic for edit guardian goes here')

    createModal(userObject._id, route);
}


function createModal(id, route){
    const $modalDivMain = $('<div>').attr('id', id);
    $modalDivMain.attr('class', 'modal fade');
    $modalDivMain.attr('tabindex','-1');
    $modalDivMain.attr('aria-labeledby', `${id}ModalLabel`);
    $modalDivMain.attr('aria-hidden','true');

    const $modalDivDialog = $('<div>').attr('class', 'modal-dialog');
    $modalDivMain.append($modalDivDialog);
    
    const $modalDivContent = $('<div>').attr('class','modal-content');
    $modalDivDialog.append($modalDivContent);

    const $modalDivHeader = $('<div>').attr('class','modal-header');
    $modalDivContent.append($modalDivHeader)

    const $modalHeaderFive = $('<h5>').attr('class', 'modal-title');
    $modalHeaderFive.attr('id', `${id}ModalLabel`);
    $modalHeaderFive.text(`Update ${route}`);
    $modalDivHeader.append($modalHeaderFive);

    const $modalButtonExit = $('button>').attr('type','button');
    $modalButtonExit.attr('class','close');
    $modalButtonExit.attr('data-dismiss','modal');
    $modalButtonExit.attr('aria-label', "Close");
    $modalDivHeader.append($modalButtonExit);

    const $modalButtonExitSpan = $('<span>').attr('aria-hidden','true')
    $modalButtonExitSpan.text('&times;');
    $modalButtonExit.append($modalButtonExitSpan);

    const $modalDivBody = $('<div>').attr('class','modal-body');
    $modalDivBody.attr(`modal-${id}-body`);
    $modalDivContent.append($modalDivBody);

    //TODO: ADD CONTENT TO DIV BODY

    const $modalDivFooter = $('<div>').attr('class','modal-footer');
    $modalDivContent.append($modalDivFooter);

    const $modalDivFooterButtonClose = $('<button>').attr('type','button');
    $modalDivFooterButtonClose.attr('class','btn btn-secondary');
    $modalDivFooterButtonClose.attr('data-dismiss','modal');
    $modalDivFooterButtonClose.text('Close');
    $modalDivFooter.append($modalDivFooterButtonClose);

    const $modalDivFooterButtonSave = $('<button>').attr('type','button');
    $modalDivFooterButtonSave.attr('class','btn btn-primary');
    $modalDivFooterButtonSave.attr('id',`btn-${id}-edit-save`);
    $modalDivFooter.append($modalDivFooterButtonSave);    
}


//----------CREATE USER----------------


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
    // const $modal = $('createStudentModal');
    // $modal.modal('hide');
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
