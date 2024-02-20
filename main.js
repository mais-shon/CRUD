var courseName=document.getElementById("courseName");
var courseCategory=document.getElementById("courseCategory");
var coursePrice=document.getElementById("coursePrice");
var courseDescription=document.getElementById("courseDescription");
var courseCapacity=document.getElementById("courseCapacity");
var clickbtn=document.getElementById("click");
var data=document.getElementById("data");
var deleteBtn=document.getElementById("deleteBtn");
var search=document.getElementById("search");
var currentIndex=0;
 var courses;

if(JSON.parse(localStorage.getItem("courses"))==null){
courses=[];
}else
 courses= JSON.parse(localStorage.getItem("courses"))

read()

clickbtn.onclick=function(e){
    e.preventDefault();
    if(clickbtn.value=='Add Course'){
      addCourses();
    }else{
      update();
    }
    courseName.classList.remove('is-valid')
    courseCategory.classList.remove('is-valid')
      coursePrice.classList.remove('is-valid')
      courseDescription.classList.remove('is-valid')
      courseCapacity.classList.remove('is-valid')
   
}
function addCourses(){
    course={
        courseName:courseName.value,
        courseCategory:courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription:courseDescription.value,
        courseCapacity:courseCapacity.value,

    }
    courses.push(course)
   localStorage.setItem("courses",JSON.stringify(courses));
    clearfileds();
    read();
    
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2000
      })
   
}
//clear input 
function clearfileds(){
 
        courseName.value="",
        courseCategory.value="",
        coursePrice.value="",
        courseDescription.value="",
        courseCapacity.value=""
}
//dispaly element 
function read(){
    result="";
    for(var i=0;i<courses.length;i++){
        result+=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i]. courseCapacity}</td>
        <td><button class='btn btn-success'  onclick="getinput(${i})" type="button">update</button></td>
        <td><button  class='btn btn-danger' onclick="deleteCourse(${i})" type="button">delete</button></td>
       
      
      </tr>`

    }
    data.innerHTML=result;
}
//delete all element
deleteBtn.onclick=function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[]
            localStorage.setItem("courses",JSON.stringify(courses));
    read();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      }) 
    }
     



//delete specefic element
function deleteCourse(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i,1);
            localStorage.setItem("courses",JSON.stringify(courses));
read()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
 
          )
        }
      })


}

//SEARCH FOR ELEMENT IN ARRAY
search.onkeyup=function(){
  result="";
  for(var i= 0;i<courses.length;i++){
    if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase()))
    result+=`
    <tr>
    <td>${i+1}</td>
    <td>${courses[i].courseName}</td>
    <td>${courses[i].courseCategory}</td>
    <td>${courses[i].coursePrice}</td>
    <td>${courses[i].courseDescription}</td>
    <td>${courses[i]. courseCapacity}</td>
    <td><button class='btn btn-success' type="button">update</button></td>
    <td><button  class='btn btn-danger' onclick="deleteCourse(${i})" type="button">delete</button></td>
 
  
  </tr>`

}
data.innerHTML=result;

  }

  function getinput(i){
 
  
   var course=courses[i];
   courseName.value=course.courseName,
        courseCategory.value=course.courseCategory,
        coursePrice.value=course.coursePrice,
        courseDescription.value=course.courseDescription,
        courseCapacity.value=course.courseCapacity
clickbtn.value ="update";
currentIndex=i;
  }

  function update(){
    course={
      courseName:courseName.value,
      courseCategory:courseCategory.value,
      coursePrice:coursePrice.value,
      courseDescription:courseDescription.value,
      courseCapacity:courseCapacity.value,

  }
 courses[currentIndex].courseName=course.courseName;
 courses[currentIndex].courseCategory=course.courseCategory;
 courses[currentIndex].coursePrice=course.coursePrice;
 courses[currentIndex].courseDescription=course.courseDescription;
 courses[currentIndex].courseCapacity=course.courseCapacity;

read()
clickbtn.value="Add Course"
clearfileds();
localStorage.setItem("courses",JSON.stringify(courses));

  }

  //validation using regex
  courseName.onkeyup=function(){
    var pattern=/^[A-Z][a-z]{2,9}$/;
  if(pattern.test(courseName.value)){
    clickbtn.removeAttribute('disabled')
    if(courseName.classList.contains('is-invalid')){
      courseName.classList.replace('is-invalid','is-valid')

    }else{
      courseName.classList.add('is-valid')
    }



  }else if(courseName.classList.contains('is-valid')){
  clickbtn.setAttribute('disabled','disabled')
  courseName.classList.replace('is-valid','is-invalid')}
  else{
    clickbtn.setAttribute('disabled','disabled')
    courseName.classList.add('is-invalid')
  }
  }


  courseCategory.onkeyup=function(){
    var pattern=/^[a-z]{2,10}$/;
  if(pattern.test(courseCategory.value)){
    clickbtn.removeAttribute('disabled')
    if(courseCategory.classList.contains('is-invalid')){
      courseCategory.classList.replace('is-invalid','is-valid')

    }else{
      courseCategory.classList.add('is-valid')
    }

    

  }else if(courseCategory.classList.contains('is-valid')){
  clickbtn.setAttribute('disabled','disabled')
  courseCategory.classList.replace('is-valid','is-invalid')}
  else{
    clickbtn.setAttribute('disabled','disabled')
    courseCategory.classList.add('is-invalid')
  }
  }


  coursePrice.onkeyup=function(){
    var pattern=/^[0-9]{3,4}$/;
  if(pattern.test(coursePrice.value)){
    clickbtn.removeAttribute('disabled')
    if(coursePrice.classList.contains('is-invalid')){
      coursePrice.classList.replace('is-invalid','is-valid')

    }else{
      coursePrice.classList.add('is-valid')
    }

    

  }else if(coursePrice.classList.contains('is-valid')){
  clickbtn.setAttribute('disabled','disabled')
  coursePrice.classList.replace('is-valid','is-invalid')}
  else{
    clickbtn.setAttribute('disabled','disabled')
    coursePrice.classList.add('is-invalid')
  }
  }

  courseDescription.onkeyup=function(){
    var pattern=/^[A-Z a-z]{8,100}$/;
  if(pattern.test(courseDescription.value)){
    clickbtn.removeAttribute('disabled')
    if(courseDescription.classList.contains('is-invalid')){
      courseDescription.classList.replace('is-invalid','is-valid')

    }else{
      courseDescription.classList.add('is-valid')
    }

    

  }else if(courseDescription.classList.contains('is-valid')){
  clickbtn.setAttribute('disabled','disabled')
  courseDescription.classList.replace('is-valid','is-invalid')}
  else{
    clickbtn.setAttribute('disabled','disabled')
    courseDescription.classList.add('is-invalid')
  }
  }

  courseCapacity.onkeyup=function(){
    var pattern=/^[0-9]{2,3}$/;
  if(pattern.test(courseCapacity.value)){
    clickbtn.removeAttribute('disabled')
    if(courseCapacity.classList.contains('is-invalid')){
      courseCapacity.classList.replace('is-invalid','is-valid')

    }else{
      courseCapacity.classList.add('is-valid')
    }

    

  }else if(courseCapacity.classList.contains('is-valid')){
  clickbtn.setAttribute('disabled','disabled')
  courseCapacity.classList.replace('is-valid','is-invalid')}
  else{
    clickbtn.setAttribute('disabled','disabled')
    courseCapacity.classList.add('is-invalid')
    
  }
  }
  
