const courses = [
  { code: 'CSE 110', name: 'Programming Building Blocks', credits: 2, completed: true },
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true },
  { code: 'CSE 111', name: 'Programming with Functions', credits: 2, completed: true },
  { code: 'CSE 210', name: 'Programming with Classes', credits: 2, completed: false },
  { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: false },
  { code: 'WDD 231', name: 'Frontend Web Development', credits: 2, completed: false },
];

const courseList = document.getElementById('courses');
const totalCredits = document.getElementById('total-credits');

function displayCourses(filter = 'all') {
  const filteredCourses = filter === 'all'
    ? courses
    : courses.filter(course => course.code.startsWith(filter.toUpperCase()));

  courseList.innerHTML = filteredCourses.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}">
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    </div>
  `).join('');

  const credits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  if (totalCredits) {
    totalCredits.textContent = credits;
  }
}

document.querySelectorAll('#filters button').forEach(button => {
  button.addEventListener('click', () => {
    displayCourses(button.id);
  });
});

displayCourses();
