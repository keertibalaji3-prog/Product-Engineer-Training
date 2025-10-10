let student = [];

function add_stu() {
    const nameInp = document.getElementById("stu_name");
    const gradeInp = document.getElementById("grade");

    const name = nameInp.value.trim();
    const grade = parseFloat(gradeInp.value);

    if (name === ""){
        alert("!! Please Enter a Student Name !!");
        return;
    }

    if (isNaN(grade) || grade < 0 || grade > 100) {
        alert("Please enter a valid grade between 0 to 100");
        return;
    }

    student.push({ name : name, grade : grade});
    nameInp.value = "";
    gradeInp.value = "";
    
    }

    function dis_grades() {
        const gradeList = document.getElementById("grade_list");

        if(student.length === 0) {
            gradeList.innerHTML = '<li>Please add students</li>';
            return;
        }

        gradeList.innerHTML = '';
        student.forEach(student_item => {
            const li = document.createElement('li');
            li.textContent = `${student_item.name} - ${student_item.grade}`;
            gradeList.appendChild(li);
        });
    }


    function calculateAverage() {
        const average_display = document.getElementById("avg_display");
    

        if(student.length === 0) {
            average_display.textContent = "Need students to calculate average, please add students !";
            return;
        }
    

    const total = student.reduce((sum, students) => sum + students.grade,0);
    const average = (total / student.length).toFixed(2);
    average_display.textContent = `Average Grade: ${average}`; 
    }
