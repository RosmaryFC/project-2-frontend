///////////////////////

//SETS URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
const deployedURL = 'https://project-2-backend.herokuapp.com';
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


    const $tableItems = $('<table>').attr('class','table-students');
    $tableItems.attr('style','width:100%');
    $table.append($tableItems);
    
    //Create ul where entries will be appended to
    const $tableHeaders = $('<tr>').attr('class','list-students-entries');
    $tableItems.append($tableHeaders);

    const $thDropDown = $('<th>').attr('class', 'list-drop-down').text("MENU")
    const $thName = $('<th>').attr('class', 'list-students-names').text('NAME');
    const $thAge = $('<th>').attr('class', 'list-students-ages').text('AGE');
    const $thRank = $('<th>').attr('class', 'list-students-ranks').text('RANK');
    const $thMonthlyFee = $('<th>').attr('class', 'list-students-fee').text('MONTHLY FEE')
    const $thDueDay = $('<th>').attr('class', 'list-students-due').text('MONTHLY DUE DAY')
    $tableHeaders.append($thDropDown)
    $tableHeaders.append($thName)
    $tableHeaders.append($thAge)
    $tableHeaders.append($thRank)
    $tableHeaders.append($thMonthlyFee)
    $tableHeaders.append($thDueDay)


    //POPULATE TABLE WITH RETRIEVED DATA
    data.forEach((student) => {

        const $trEntry = $('<tr>')
        $tableItems.append($trEntry)

        //append a menu from bootstrap with edit button and delete button
        const $dropDown = createDropdownMenu(student);
        //append menu to trEntry
        $trEntry.append($dropDown); 

        const $liNameEntry = $('<td>').text(`${student.firstName} ${student.lastName}`);
        const $liAgeEntry = $('<td>').text(getAge(student.dateOfBirth));
        const $liRankEntry = $('<td>').text(student.rank);
        const $liMonthlyFeeEntry = $('<td>').text(student.billing.monthlyFee);
        const $liDueDateEntry = $('<td>').text(student.billing.monthlyDueDate);
        $trEntry.append($liNameEntry);
        $trEntry.append($liAgeEntry);
        $trEntry.append($liRankEntry);
        $trEntry.append($liMonthlyFeeEntry);
        $trEntry.append($liDueDateEntry);
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

    const $tableItems = $('<table>').attr('class','table-guardians');
    $tableItems.attr('style','width:100%');
    $table.append($tableItems);

    //Create tr where entries will be appended to
    const $tableHeaders = $('<tr>').attr('class','list-guardians-entries');
    $tableItems.append($tableHeaders);

    const $thDropDown = $('<th>').attr('class', 'list-drop-down').text("MENU")
    const $thName = $('<th>').attr('class', 'list-guardians-names').text('NAME')
    const $thNumber = $('<th>').attr('class', 'list-guardians-numbers').text('NUMBER')
    const $thEmail = $('<th>').attr('class', 'list-guardians-emails').text('EMAIL')
    const $thAddress = $('<th>').attr('class', 'list-guardians-addresses').text('ADDRESS')
    $tableHeaders.append($thDropDown)
    $tableHeaders.append($thName)
    $tableHeaders.append($thNumber)
    $tableHeaders.append($thEmail)
    $tableHeaders.append($thAddress)


    //POPULATE TABLE WITH RETRIEVED DATA
    data.forEach((guardian) => {

        const $trEntry = $('<tr>');
        $tableItems.append($trEntry);

        //append a menu from bootstrap with edit button and delete button
        const $dropDown = createDropdownMenu(guardian);
        //append menu to tdEntry
        $trEntry.append($dropDown);        
        

        const $liNameEntry = $('<td>').text(`${guardian.firstName} ${guardian.lastName}`);
        const $liNumberEntry = $('<td>').text(getAge(guardian.contactInfo.phoneNumber));
        const $liEmailEntry = $('<td>').text(guardian.contactInfo.email);
        const $liAddressEntry = $('<td>').text(guardian.contactInfo.address);
        $trEntry.append($liNameEntry);
        $trEntry.append($liNumberEntry);
        $trEntry.append($liEmailEntry);
        $trEntry.append($liAddressEntry);
    });
}

//TODO: refactor and complete this function so you can add guardians to students and vise versa
// function populateGuardianEntry(guardian) {
//     return
// }

//create a menu from bootstrap with edit button and delete button
function createDropdownMenu (userObject) {
    const $liDropdown = $('<td>');

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

        editUser(userObject)
    })

    //create items and set on clicks
    const $aDelete = $('<button>').attr('class',"dropdown-item");
    $aDelete.text('Delete');
    //On Click to delete each item
    $aDelete.on('click', (event) => {
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
            newGuardian.students.push(studentsInputs[i]);
        }
    }


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
    populateGuardianTable();
});
$btnStudent.on('click', (event) => {
    populateStudentTable();
});

$btnCreateStudentSave.on('click', (event) => {
    createStudent();
})

$btnCreateGuardianSave.on('click', (event) => {
    createGuardian();
})
