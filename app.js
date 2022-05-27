//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput=document.getElementById("new-task__content");//Add a new task.
const addButton=document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder=document.getElementById("undone");//ul of #incompleteTasks
const completedTasksHolder=document.getElementById("done");//completed-tasks


const createEl=(data)=>{
  const {tag, classes, attribs}=data;
  const el = document.createElement(tag);
  classes.forEach(className => el.classList.add(className));
  for (let attr in attribs){
    el.setAttribute(attr, attribs[attr]);
  }
  return el;
}
//New task list item
const createNewTaskElement=(taskString)=>{

  const listItem=createEl({tag: "li", classes:["task-list__item","item","row"], attribs:{}});

  //input (checkbox)
  const checkBox=createEl({tag: "input", classes:["item__check"], attribs:{type:"checkbox"}});//checkbx
  //label
  const label=createEl({tag: "label", classes:["task","item__label"], attribs:{}});//label
  //input (text)
  const editInput=createEl({tag: "input", classes:[], attribs:{}});//text
  //button.edit
  const editButton=createEl({tag: "button", classes:["task","item__input"], attribs:{type: "text"}});//edit button

  //button.delete
  const deleteButton=createEl({tag: "button", classes:["btn","edit"], attribs:{}});//delete button
  const deleteButtonImg=createEl({tag: "img", classes:["btn__icon"], attribs:{src:"./remove.svg",alt:"remove"}});//delete button image

  label.innerText=taskString;
  //Each elements, needs appending

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.

  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask=()=>{
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

const editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  const listItem=this.parentNode;

  const editInput=listItem.querySelector(".item__label");
  const label=listItem.querySelector(".item__label");
  const editBtn=listItem.querySelector(".edit");
  const containsClass=listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};


//Delete task.
const deleteTask=function(){
  console.log("Delete Task...");

  const listItem=this.parentNode;
  const ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete=()=>{
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleteed);
}



const ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  const checkBox=taskListItem.querySelector(".item__check");
  const editButton=taskListItem.querySelector("button.edit");
  const deleteButton=taskListItem.querySelector("button.delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleteed to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
