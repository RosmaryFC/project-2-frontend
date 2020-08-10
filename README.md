# project-1-portfolio Overview

## Project Schedule

|  Day | Deliverable | Status
|-----|----------------------------------------------| ----------|
|Day 4,5 - Monday| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 5 - Tuesday| MVP & Bug Fixes                               | Complete
|Day 6 - Wednesday| Final Touches                               | Complete
|Day 7 - Thursday| Deployment                                   | Complete
|Day 8 - Friday| Present                                        | Incomplete

Project Schedule started in [Backend](https://github.com/RosmaryFC/project-2-backend)


## Project Description

Link to final [project](https://hiraldokai-management.netlify.app/)

Introducing, Our Unit-2 project for General Assembly's SEI program.
For Project 2, I will be creating a fullstack website for my karate school to manage students with their payments and progress.
 The frontend will include:
 * a bar to choose between populating students or guardians
 * an option to add a student orguardians
 * a table that populates a list of students or a list of guardians
 * an option to edit each student orguardians info
 * an option to delete a student orguardians
 * an option to create a student orguardians


* I am considering using some of these color combinations found on [Canva](https://www.canva.com/colors/color-palettes/)
   * [Melted Chocolate](https://www.canva.com/colors/color-palettes/melted-chocolate/)
   * [Bonfire Glow](https://www.canva.com/colors/color-palettes/bonfire-glow/)
   * [Metal and Glass](https://www.canva.com/colors/color-palettes/metal-and-glass/)
   * [Secret Romance](https://www.canva.com/colors/color-palettes/secret-romance/)

* If there is a color palette you'd like to make based on a color you'd like, Canva recommends using this [color wheel](https://www.canva.com/colors/color-wheel/).
* More info on website color schemese [here](https://www.canva.com/learn/website-color-schemes/).

Some inspiration for animations has come from [pursuit](https://www.pursuit.org/fellowship). I also really like their web design.
Other inspiration will come from T-mobiles client management system since I worked there for a few years. Also, facebooks website and how they display posts, and just their overall updating options.

## Wireframes

Wireframes were done using [figma](https://www.figma.com/).
Below are the wireframes for Desktop, Tablet, and Mobile

- [Mobile](https://res.cloudinary.com/rosefc/image/upload/v1596396466/project%202/projectTwoMobileWireframe.png)
- [Tablet](https://res.cloudinary.com/rosefc/image/upload/v1596396466/project%202/projectTwoTabletWireframe.png)
- [Desktop](https://res.cloudinary.com/rosefc/image/upload/v1596396467/project%202/projectTwoWebWireframe.png)

## Time/Priority Matrix 

You can check out my `Time and Priority` Matrix [here](https://res.cloudinary.com/rosefc/image/upload/v1596354773/project%202/projectTwoFrontendTimePriorityMatrix.png)

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP. 
#### MVP (examples)

- Header section - student / guarantee option as well as school logo
- table section - displays list of students or pguarantee
- create student/parent text box - appears after clicking create student/guarantee button
- edit student/parent text box - appears when clicking student/guarantee
- delete student - after clicking edit student, there will be an option to delete student
- Responsive Layout Tablet - make website responsive for devices under 900px
- Responsive layout Mobile - make website responsive to devices under 350px
- create hamburger menu for mobile layout

#### PostMVP 

*  Animations
   * Animations for Nav Bar 
   * Animations for expanding student info in tablet and mobile layout
* a search bar that can search students or parents by their name, Id, phone number, etc.
* when student is past due, highlight red
* option to order by name, age, rank, due date


## Functional Components

I've broken down each part of the website to smaller tasks below.

#### MVP

| Component                                             | Priority | Estimated Time | Time Invested  | Actual Time |
| ---                                                   | :---:    |  :---:         | :---:          | :---:       |
| HTML skeleton setup for section                       | H        | 1hr            | 1hr            | -hr         |
| Header - Nav Bar                                      | H        | .5hr            | .5hr            | -hr         |
| Header - Logo Image                                   | H        | .5hr            | .25hr            | -hr         |
| Header - Photo                                        | H        | .5hr            | .25hr            | -hr         |
| Header -  Name (student parent)                       | H        | .5hr            | .25hr            | -hr         |
| Header - Aligning all the elements                    | H        | .5hr            | .5hr            | -hr         |
| Search/Add - Bar                                      | H        | .5hr            | 0hr            | -hr         |
| Search/add - align all the elements                   | H        | .5hr            | 0hr            | -hr         |
| Table - Flex layout                                   | H        | .5hr            | 3hr            | -hr         |
| Students - on click                                   | H        | 2hr             | .5hr            | -hr         |
| Students - new student button                         | H        | 2hr             | .5hr            | -hr         |
| Students - create student prompt box                  | H        | 1hr             | 2hr            | -hr         |
| Students - on click -> edit                           | H        | 2hr             | 1hr            | -hr         |
| Students - on click -> edit -> save                   | H        | 2hr             | 6hr            | -hr         |
| Students - on click -> edit -> delete                 | H        | 2hr             | .5hr            | -hr         |
| Parents - on click                                    | H        | 2hr             | .5hr            | -hr         |
| Parents - new parent button                           | H        | 2hr             | .5hr            | -hr         |
| Parents - create parent prompt box                    | H        | 1hr             | 2hr            | -hr         |
| Parents - on click -> edit                            | H        | 2hr             | .5hr            | -hr         |
| Parents - on click -> edit -> save                    | H        | 2hr             | 1hr            | -hr         |
| Parents - on click -> edit -> delete                  | H        | 2hr             | .5hr            | -hr         |
| Media Tablet - Header                                 | M        | 1.5hr           | 1hr            | -hr         |
| Media Tablet - Search/Add                             | M        | 1.5hr           | 0hr            | -hr         |
| Media Tablet - Table                                  | M        | 1.5hr           | 0hr            | -hr         |
| Media Tablet - Create Student/Parent                  | M        | 1.5hr           | 0hr            | -hr         |
| Media Tablet - Edit Student/Parent                    | M        | 1.5hr           | 0hr            | -hr         |
| Media Tablet - Delete Student/Parent                  | M        | 1.5hr           | 0hr            | -hr         |
| Media Mobile - Drop Down Hamburger Students Parents   | M        | 1.5hr           | 0hr            | -hr         |
| Media Mobile - Search                                 | M        | 1.5hr           | 0hr            | -hr         |
| Media Mobile - Table                                  | M        | 1.5hr           | 0hr            | -hr         |
| Media Mobile - Create Student/Parent                  | M        | 1.5hr           | 0hr            | -hr         |
| Media Mobile - Edit Student/Parent                    | M        | 1.5hr           | 0hr            | -hr         |
| Media Mobile - Delete Student/Parent                  | M        | 1.5hr           | 0hr            | -hr         |
| Deployment Time                                       | M        | 2hr             | .5hr            | -hr         |
| Total                                                 |          | 63.5hrs         | 22.75hr            | -hr         |

#### PostMVP
| Component                                  | Priority | Estimated Time | Time Investted | Actual Time |
| ---                                        | :---:    |  :---:         | :---:          | :---:       |
| Animations                                 | L        | 4hr            | -hr            | -hr         |
| Improve styling of website                 | H        | 4hr            | 1hr            | -hr         |
| Total                                      |          | 8hrs           | -1r            | -hr         |




## Additional Libraries
 This section lists all supporting libraries or tools and their role in the project.
 - JQuery - allowed me to easily populate my porject divs into the webpage as well take user information and push it into a googleform sheet.
 - font-awesome - I used this to set the different fonts of the page.
 - Google Sheets - I use google sheets as a data base for the forms and my projects.



## Code Snippet

This section will include a brief code snippet of functionality that I am proud of and a brief description  

For each student or guardian item, I created their own dropdown menu items where an edit button and delete button was stored for each items logic. I took bootstraps dropdown html logic and created it with javascript. I didn't think it would work but it did! It also works very well! I ran into no issues.
```
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
```

## Issues and Resolutions
 This section will list all major issues encountered and their resolution.

* ISSUE: When creating Student edit logic, I had an issue where the save click would duplicate after the first time I clicked it and keep incrementing the duplicate for every time I clicked it for students or guardians on save.
* RESOLVE: I removed the on click listener prior to calling the on click listener every time.

* ISSUE: the table was not aligned since I used list items
* RESOLVE: I changed my table logic to use an actual table element instead of divs or list items

* ISSUE: I was trying to figure out how to make a modal appear without having to add it to the html. I tried creating a modal in javascript like I did with the dropdown menu's. It did not work
* RESOLVE: I indeed had to create a modal in my html, and I created the buttons in my javascript that fired the modal. 

* ISSUE: the fact that I created a table really limited my functionality when thinking about media queries. I feel like I would have to rethink my code structure in order for the table logic work for a phone for example.