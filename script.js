// --- Constants for Data Files (Future Use) ---
// const AGGREGATED_SCORES_CSV_URL = 'data/DashboardFeed_AggregatedScores.csv'; // Example path
// const QUESTION_DETAILS_CSV_URL = 'data/DashboardFeed_QuestionDetails.csv'; // Example path

// --- Dummy Data (Used for now, will be replaced by CSV data) ---
let currentStudentData = { // Default "Alex Johnson" data, or will be updated based on StudentGmailID
    name: "Alex Johnson",
    targetScore: 1400,
    latestScores: {
        total: 1250,
        rw: 620,
        math: 630,
        avgEocKhan: 78
    },
    classAveragesGlobal: { // Simplified class averages for the overview
        total: 1180,
        rw: 590,
        math: 590,
        avgEocKhan: 75
    },
    scoreTrend: {
        labels: ['Diag', 'Test 1', 'Test 2', 'Test 3 (Attempted)', 'Test 4'],
        studentScores: [1130, 1220, 1250, 1280, 1310],
        classAvgScores: [1050, 1150, 1180, 1200, 1220]
    },
    overallSkillPerformance: { 
        labels: ['Reading', 'Writing & Language', 'Math'], // Updated for 3 skills
        studentAccuracy: [78, 82, 75], 
        classAvgAccuracy: [75, 79, 72]
    },
    strengths: ["Heart of Algebra (95%)", "Words in Context (90%)"],
    improvements: ["Passport to Advanced Math (45%)", "Command of Evidence (50%)"],
    timeSpent: {
        studentAvg: 32,
        classAvg: 35
    },
    cbPracticeTests: [
        { name: "Diagnostic Test", date: "2024-03-01", rw: "550", math: "580", total: "1130", classAvgRW: "520", classAvgMath: "530", classAvgTotal: "1050"},
        { name: "Official Practice Test 1", date: "2024-04-10", rw: "600", math: "620", total: "1220", classAvgRW: "580", classAvgMath: "600", classAvgTotal: "1180"},
        { name: "Official Practice Test 2", date: "2024-05-15", rw: "620", math: "630", total: "1250", classAvgRW: "590", classAvgMath: "590", classAvgTotal: "1180"},
        { name: "Official Practice Test 3", date: "Not Attempted", rw: "-", math: "-", total: "-", classAvgRW: "(N/A)", classAvgMath: "(N/A)", classAvgTotal: "(N/A)"},
        { name: "Official Practice Test 4", date: "Not Attempted", rw: "-", math: "-", total: "-", classAvgRW: "(N/A)", classAvgMath: "(N/A)", classAvgTotal: "(N/A)"},
        { name: "Official Practice Test 5", date: "Not Attempted", rw: "-", math: "-", total: "-", classAvgRW: "(N/A)", classAvgMath: "(N/A)", classAvgTotal: "(N/A)"},
        { name: "Official Practice Test 6", date: "Not Attempted", rw: "-", math: "-", total: "-", classAvgRW: "(N/A)", classAvgMath: "(N/A)", classAvgTotal: "(N/A)"},
        { name: "Official Practice Test 7", date: "Not Attempted", rw: "-", math: "-", total: "-", classAvgRW: "(N/A)", classAvgMath: "(N/A)", classAvgTotal: "(N/A)"},
    ],
    eocQuizzes: {
        reading: [ { name: "Vocabulary in Context", latestScore: "85% (17/20)", classAvg: "78%", date: "2024-05-01" } ],
        writing: [ { name: "Transitions", latestScore: "90% (9/10)", classAvg: "80%", date: "2024-05-03" } ],
        math: [ { name: "Exponents & Radicals", latestScore: "75% (15/20)", classAvg: "70%", date: "2024-05-05" } ]
    },
    khanAcademy: {
        reading: [{ name: "Khan Academy: Main Idea Practice 1", date: "2024-05-10", score: "8/10 (80%)", pointsPossible: "10", classAvg: "75%" }],
        writing: [{ name: "Khan Academy: Verb Tense Advanced", date: "2024-05-11", score: "12/15 (80%)", pointsPossible: "15", classAvg: "78%" }],
        math: [] 
    },
    cbSkills: {
        reading: [ { name: "Information and Ideas: Central Ideas & Details", score: 85, classAvg: 78 }, { name: "Info & Ideas: Command of Evidence", score: 60, classAvg: 65 }],
        writing: [ { name: "Expression of Ideas: Rhetorical Synthesis", score: 75, classAvg: 70 } ],
        math: [ { name: "Algebra: Linear equations & inequalities", score: 90, classAvg: 85 } ]
    }
};

const eocChapters = {
    reading: ["Vocabulary in Context", "Making the Leap", "The Big Picture", "Literal Comprehension", "Reading for Function", "Supporting & Undermining", "Graphs & Charts", "Paired Passages"],
    writing: ["Transitions", "Specific Focus", "Sentences & Fragments", "Joining & Separating Sentences", "Non-Essential & Essential Clauses", "Verbs Agreements and Tense", "Pronouns", "Modification", "Parallel Structure"],
    math: ["Exponents & Radicals", "Percent", "Rates", "Ratio & Proportion", "Expressions", "Constructing Models", "Manipulating & Solving Equations", "Systems of Equations", "Inequalities", "Lines", "Functions", "Quadratics", "Angles", "Triangles", "Circles", "Trigonometry", "Probability", "Statistics 1"]
};

let modalDonutChartInstance = null; 
let modalLineChartInstance = null; 
let scoreTrendChartInstance = null; 
let overallSkillChartInstance = null;

document.addEventListener('DOMContentLoaded', function () {
    loadAndDisplayData(); 
    setupEventListeners();
});

function setupEventListeners() {
    const mainTabs = document.querySelectorAll('.main-tab-button');
    const mainTabContents = document.querySelectorAll('.main-tab-content');
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            mainTabs.forEach(t => t.classList.remove('active'));
            mainTabContents.forEach(content => content.classList.add('hidden'));
            tab.classList.add('active');
            const targetContentId = tab.getAttribute('data-main-tab') + '-content';
            const targetElement = document.getElementById(targetContentId);
            if (targetElement) {
                targetElement.classList.remove('hidden');
            }
            if (targetContentId === 'overview-content') {
                initializeOverviewCharts(currentStudentData); 
            }
            const firstSubTab = document.querySelector(`#${targetContentId} .sub-tab-button`);
            if (firstSubTab) {
                firstSubTab.click(); 
            }
        });
    });

    document.querySelectorAll('.sub-tab-button').forEach(subTab => {
        subTab.addEventListener('click', () => {
            const parentMainTabContent = subTab.closest('.main-tab-content');
            parentMainTabContent.querySelectorAll('.sub-tab-button').forEach(st => st.classList.remove('active'));
            parentMainTabContent.querySelectorAll('.sub-tab-content-panel').forEach(panel => panel.classList.add('hidden'));
            subTab.classList.add('active');
            const targetSubContentId = subTab.getAttribute('data-sub-tab') + '-content';
            document.getElementById(targetSubContentId)?.classList.remove('hidden');
        });
    });
    
    if (mainTabs.length > 0) {
        mainTabs[0].click(); 
    }
}

async function loadAndDisplayData() {
    document.getElementById('studentNameDisplay').textContent = `Welcome, ${currentStudentData.name}!`;
    populateOverviewSnapshot(currentStudentData); 
    populatePracticeTestsTable(currentStudentData.cbPracticeTests);
    
    ['reading', 'writing', 'math'].forEach(subject => {
        const studentEOCs = currentStudentData.eocQuizzes[subject] || [];
        const allSubjectEOCs = (eocChapters[subject] || []).map(chapterName => {
            const existing = studentEOCs.find(e => e.name === chapterName);
            return existing || { name: chapterName, latestScore: "N/A", classAvg: "N/A", date: "N/A" };
        });

        populateEOCTable(subject, allSubjectEOCs);
        populateKhanSection(subject, currentStudentData.khanAcademy[subject] || []);
        
        const studentCBSkills = currentStudentData.cbSkills[subject] || [];
        populateCBSkills(subject, studentCBSkills);
    });
}

function populateOverviewSnapshot(studentData) {
    const overviewStrengths = document.querySelector('#overview-content ul:first-of-type'); 
    const overviewWeaknesses = document.querySelector('#overview-content ul:last-of-type'); 
    
    if(overviewStrengths) {
        overviewStrengths.innerHTML = ''; 
        studentData.strengths.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            overviewStrengths.appendChild(li);
        });
    }
    if(overviewWeaknesses) {
        overviewWeaknesses.innerHTML = ''; 
        studentData.improvements.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            overviewWeaknesses.appendChild(li);
        });
    }
}

function initializeOverviewCharts(studentData) {
    const primaryChartColor = '#2a5266'; 
    const secondaryChartColor = '#757575'; 
    const barChartPrimaryBg = 'rgba(42, 82, 102, 0.8)'; 
    const barChartSecondaryBg = 'rgba(117, 117, 117, 0.7)';

    const chartOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: true, position: 'bottom' }}};
    
    const scoreTrendCtx = document.getElementById('scoreTrendChart')?.getContext('2d');
    if (scoreTrendCtx) {
        if (scoreTrendChartInstance) scoreTrendChartInstance.destroy();
        scoreTrendChartInstance = new Chart(scoreTrendCtx, { 
            type: 'line', 
            data: { 
                labels: studentData.scoreTrend.labels, 
                datasets: [
                    { label: 'Your Total Scaled Score', data: studentData.scoreTrend.studentScores, borderColor: primaryChartColor, tension: 0.1, fill: false },
                    { label: 'Class Average Total Score', data: studentData.scoreTrend.classAvgScores, borderColor: secondaryChartColor, tension: 0.1, borderDash: [5, 5], fill: false }
                ] 
            }, 
            options: chartOptions 
        });
    }
    
    const overallSkillCtx = document.getElementById('overallSkillChart')?.getContext('2d');
    if (overallSkillCtx) {
        if (overallSkillChartInstance) overallSkillChartInstance.destroy();
        overallSkillChartInstance = new Chart(overallSkillCtx, { 
            type: 'bar', 
            data: { 
                labels: studentData.overallSkillPerformance.labels, 
                datasets: [
                    { label: 'Your Accuracy', data: studentData.overallSkillPerformance.studentAccuracy, backgroundColor: barChartPrimaryBg },
                    { label: 'Class Average Accuracy', data: studentData.overallSkillPerformance.classAvgAccuracy, backgroundColor: barChartSecondaryBg }
                ] 
            }, 
            options: { ...chartOptions, scales: { y: { beginAtZero: true, max: 100 } } } 
        });
    }
}

function populatePracticeTestsTable(testsData) {
    const cbTableBody = document.getElementById('cb-practice-tests-table-body');
    if (!cbTableBody) return;
    cbTableBody.innerHTML = ''; 
    testsData.forEach(test => {
        const row = cbTableBody.insertRow();
        row.className = 'clickable-row';
        row.innerHTML = `<td>${test.name}</td><td>${test.date}</td><td>${test.rw}</td><td>${test.math}</td><td>${test.total}</td><td>${test.classAvgRW}</td><td>${test.classAvgMath}</td><td>${test.classAvgTotal}</td>`;
        row.onclick = () => openModal(`CB Practice Test: ${test.name}`, { type: 'cb_test', data: test });
    });
}

function populateEOCTable(sectionKey, eocQuizData) {
    const tbody = document.getElementById(`${sectionKey}-eoc-tbody`);
    const thead = document.getElementById(`${sectionKey}-eoc-thead`);
    if (!tbody || !thead) return;
    
    thead.innerHTML = `<tr><th>Chapter/Quiz Name</th><th>Latest Score</th><th>Date Attempted</th><th>Class Avg Score</th></tr>`;
    tbody.innerHTML = ''; 

    (eocQuizData || []).forEach(item => {
        const row = tbody.insertRow();
        row.className = 'clickable-row';
        row.innerHTML = `<td>${item.name}</td><td>${item.latestScore}</td><td>${item.date}</td><td>${item.classAvg}</td>`;
        row.onclick = () => openModal(`EOC Quiz: ${item.name}`, { type: 'eoc_quiz', data: item });
    });
     if ((eocQuizData || []).length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-gray-500 py-3">No EOC Quiz data available for ${sectionKey}.</td></tr>`;
    }
}

function populateKhanSection(sectionKey, khanItems) {
    const container = document.getElementById(`${sectionKey}-khan-data`);
    if (!container) return;
    container.innerHTML = ''; 

    if (khanItems.length > 0) {
        const table = document.createElement('table');
        table.className = 'min-w-full table';
        table.innerHTML = `<thead><tr><th>Assignment Name</th><th>Date</th><th>Your Score</th><th>Points Possible</th><th>Class Avg</th></tr></thead><tbody></tbody>`;
        const tbody = table.querySelector('tbody');
        khanItems.forEach(item => {
            const row = tbody.insertRow();
            row.className = 'clickable-row';
            row.innerHTML = `<td>${item.name}</td><td>${item.date}</td><td>${item.score}</td><td>${item.pointsPossible}</td><td>${item.classAvg}</td>`;
            row.onclick = () => openModal(`Khan Academy: ${item.name}`, { type: 'khan', data: item });
        });
        container.appendChild(table);
    } else {
        container.innerHTML = `<p class="text-gray-600 p-3">No Khan Academy ${sectionKey} practice data available for ${currentStudentData.name}.</p>`;
    }
}

function getPerformanceClass(score) {
    if (score >= 85) return 'performance-good';
    if (score >= 70) return 'performance-average';
    return 'performance-poor';
}

function populateCBSkills(sectionKey, skillsData) {
    const container = document.getElementById(`${sectionKey}-cb-skills-data`);
    if (!container) return;
    container.innerHTML = ''; 

    (skillsData || []).forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'p-3 bg-gray-50 rounded-md border border-gray-200';
        const performanceClass = getPerformanceClass(skill.score);
        skillDiv.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-800">${skill.name}</span>
                <span class="text-xs ${performanceClass.replace('performance-', 'text-')} font-semibold">${skill.score}%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar ${performanceClass}" style="width: ${skill.score}%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Class Avg: ${skill.classAvg}%</p>
        `;
        container.appendChild(skillDiv);
    });
     if ((skillsData || []).length === 0) {
        container.innerHTML = `<p class="text-gray-500 p-3">No CB Skill data available for ${sectionKey}.</p>`;
    }
}

const modal = document.getElementById('detailModal');
const modalQuestionDetailsContainer = document.getElementById('modalQuestionDetails');

function openModal(title, contentDetails) { 
    const modalHeaderH2 = modal.querySelector('.modal-header h2'); 
    if(modalHeaderH2) modalHeaderH2.textContent = title;
    
    modalQuestionDetailsContainer.innerHTML = ''; 
    // Sample dummy questions for the modal
    const dQ=[
        {text:"Solve for x: 2x + 5 = 15",yourAnswer:"x = 5",correct:true,classCorrectPercent:92,status:'answered'},
        {text:"Identify the main theme of paragraph 2.",yourAnswer:"Supporting detail A",correct:false,classCorrectPercent:75,status:'answered'},
        {text:"Which transition best connects these sentences?",yourAnswer:"Therefore",correct:true,classCorrectPercent:88,status:'answered'},
        {text:"What is the value of sin(30°)?",yourAnswer:"N/A",correct:false,classCorrectPercent:95,status:'unanswered'}, // Unanswered
        {text:"A car travels 120 miles in 2 hours. What is its average speed?",yourAnswer:"50 mph",correct:false,classCorrectPercent:80,status:'answered'},
        {text:"What is the capital of Canada?",yourAnswer:"Ottawa",correct:true,classCorrectPercent:90,status:'answered'},
    ]; 
    dQ.forEach((q,i)=>{
        const d=document.createElement('div');
        let sT='',sC='';
        if(q.s==='unanswered'){sT='Unanswered';sC='bg-yellow-50 border-yellow-200 text-yellow-700';}
        else if(q.c){sT='Correct';sC='bg-green-50 border-green-200';}
        else{sT='Incorrect';sC='bg-red-50 border-red-200';}
        d.className=`p-2 border rounded-md ${sC}`;
        d.innerHTML=`<p class="font-medium text-gray-700">Q${i+1}: ${q.text}</p><p>Your Answer: <span class="font-semibold ${q.status==='unanswered'?'':(q.c?'text-good':'text-poor')}">${q.yA}</span> (${sT})</p><p class="text-xs text-gray-500">Class Avg Correctness: ${q.classCorrectPercent}% ${q.classCorrectPercent>80?'<span class="arrow-up">↑</span>':'<span class="arrow-down">↓</span>'}</p>`;
        modalQuestionDetailsContainer.appendChild(d);
    });
    
    if(modalDonutChartInstance) modalDonutChartInstance.destroy();
    if(modalLineChartInstance) modalLineChartInstance.destroy();
    
    const cor=dQ.filter(q=>q.s==='answered'&&q.c).length;
    const inc=dQ.filter(q=>q.s==='answered'&&!q.c).length;
    const un=dQ.filter(q=>q.s==='unanswered').length;
    
    const donutCtx = document.getElementById('modalDonutChart')?.getContext('2d');
    if (donutCtx) { // Check if context is successfully obtained
        modalDonutChartInstance=new Chart(donutCtx,{
            type:'doughnut',
            data:{
                labels:['Correct','Incorrect','Unanswered'],
                datasets:[{
                    data:[cor,inc,un],
                    backgroundColor:['#4caf50','#f44336','#9e9e9e'], // Green, Red, Grey
                    hoverOffset: 4
                }]
            },
            options:{
                responsive:true,
                maintainAspectRatio:true, 
                plugins:{ legend:{ position:'bottom' }},
                cutout:'50%'
            }
        });
    }

    const lineCtx = document.getElementById('modalLineChart')?.getContext('2d');
    if (lineCtx) { // Check if context is successfully obtained
        modalLineChartInstance=new Chart(lineCtx,{
            type:'line',
            data:{
                labels:['Attempt 1','Attempt 2','Attempt 3','Attempt 4','Attempt 5'], // More descriptive labels
                datasets:[
                    {label:'You',data:Array.from({length:5},()=>50+Math.random()*40),borderColor:'#2a5266',tension:0.1,fill:false}, // SAT Hub Teal
                    {label:'Class Average',data:Array.from({length:5},()=>45+Math.random()*35),borderColor:'#757575',borderDash:[5,5],tension:0.1,fill:false} // Grey
                ]
            },
            options:{
                responsive:true,
                maintainAspectRatio:true,
                scales:{y:{beginAtZero:true,max:100}},
                plugins: { legend: {display: true, position: 'bottom'}}
            }
        });
    }
    if(modal) modal.style.display="block";
}

function closeModal() { 
    if(modal) modal.style.display = "none"; 
    if (modalDonutChartInstance) modalDonutChartInstance.destroy(); 
    if (modalLineChartInstance) modalLineChartInstance.destroy(); 
}

window.onclick = function(event) { 
    if (event.target == modal) closeModal(); 
}
