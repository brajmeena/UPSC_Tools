const questions=[];

function getPageCount(marks){
 marks=Number(marks);
 if(marks<=10) return 2;
 if(marks<=15) return 3;
 return 4;
}

function importQuestions(){
 const text=document.getElementById("bulkInput").value;
 const lines=text.split("\n").filter(x=>x.trim());

 lines.forEach(line=>{
  const m=line.match(/(Q\d+)\.\s*(.*?)\s*\[(\d+)\]/i);
  if(!m) return;

  questions.push({
   qno:m[1],
   question:m[2],
   marks:Number(m[3]),
   pages:getPageCount(m[3])
  });
 });

 renderQuestions();
}

function renderQuestions(){
 const div=document.getElementById("questionList");
 div.innerHTML="";
 questions.forEach(q=>{
  div.innerHTML += `<div class="question-card"><b>${q.qno}</b><br>${q.question}<br>${q.marks} Marks (${q.pages} pages)</div>`;
 });
}

function drawLayout(pdf,footer){
 const w=pdf.internal.pageSize.getWidth();
 const h=pdf.internal.pageSize.getHeight();

 pdf.line(25,15,25,h-15);
 pdf.line(w-25,15,w-25,h-15);

 pdf.setFontSize(9);
 pdf.text(footer,15,h-8);
 pdf.text("Candidates must not write on this margin",w-8,35,{angle:90});
}

function drawQuestion(pdf,q){
 pdf.setFontSize(12);
 pdf.text(q.qno,8,20);

 const wrapped=pdf.splitTextToSize(q.question,140);
 pdf.text(wrapped,30,20);

 pdf.text(`[${q.marks} Marks]`,140,35);
}

function generatePDF(){
 const {jsPDF}=window.jspdf;
 const pdf=new jsPDF();

 questions.forEach((q,index)=>{
  for(let i=0;i<q.pages;i++){
   if(!(index===0 && i===0)) pdf.addPage();

   drawLayout(pdf,"XXXX-2026");

   if(i===0) drawQuestion(pdf,q);
  }
 });

 pdf.save("UPSC_QCAB.pdf");
}
