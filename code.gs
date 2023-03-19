//Author: Sachin M Sabariram (@ssr-04)
//January 2023 (Distribued under Open source)


function myFunction() {
  var form = FormApp.getActiveForm();
  var response = form.getResponses().pop();
  var itemResponses = response.getItemResponses();

  // Create a data table with the form responses
  var data = [];

  var grades={'O':91,'A+':81,'A':71,'B+':61,'B':56,'C':50};

  var sem1_tot = 0;
  var sem2_tot = 0;
  var sem3_tot = 0;

  var name = itemResponses[0].getResponse();
  var branch = itemResponses[1].getResponse();

  for (var i = 2; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i].getResponse();
    var grade = grades[itemResponse];
    data.push([itemResponses[i].getItem().getTitle(), grade]);
  }
  
  //Sem-1 table
  var dataTable1 = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, 'Subject')
    .addColumn(Charts.ColumnType.NUMBER, 'GRADE');

  for (var i = 0; i < 9; i++) {
    dataTable1.addRow(data[i]);
    sem1_tot += data[i][1];
  }

  //Sem-2 table
  var dataTable2 = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, 'Subject')
    .addColumn(Charts.ColumnType.NUMBER, 'GRADE');

  for (var i = 9; i < 18; i++) {
    dataTable2.addRow(data[i]);
    sem2_tot += data[i][1];
  }

  //Sem-3 table
  var dataTable3 = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, 'Subject')
    .addColumn(Charts.ColumnType.NUMBER, 'GRADE');

  for (var i = 18; i < data.length; i++) {
    dataTable3.addRow(data[i]);
    sem3_tot += data[i][1]
  }


  var sem1_avg = parseFloat((sem1_tot/9).toFixed(2));
  var sem1_c_avg = parseFloat((((2*sem1_avg)+9)/2.05).toFixed(2));
  var sem2_avg = parseFloat((sem2_tot/9).toFixed(2));
  var sem2_c_avg = parseFloat((((2*sem1_avg)+9)/2.05).toFixed(2));
  var sem3_avg = parseFloat((sem3_tot/9).toFixed(2));
  var sem3_c_avg = parseFloat((((2*sem1_avg)+9)/2.05).toFixed(2));

  var overall_avg = parseFloat(((sem1_avg+sem2_avg+sem3_avg)/3).toFixed(2));
  var overall_c_avg = parseFloat((((2*overall_avg)+9)/2.05).toFixed(2));

  var sem_trends = [["sem1",sem1_c_avg],["sem2",sem2_c_avg],["sem3",sem3_c_avg],["sem4",overall_c_avg],["sem5",overall_c_avg],["sem6",overall_c_avg],["sem7",overall_c_avg],["sem8",overall_c_avg]];



//Assessement
var z1 = parseFloat(((sem3_avg-sem2_avg)/sem2_avg)*100).toFixed(1);
if(z1>=0){
  z1 = z1.toString() + " % increased";
}
else{
   z1 = z1.toString() + " % decreased";
}

var maxi = Math.max(sem1_avg,sem2_avg,sem3_avg);
var z2 = parseFloat(((sem3_avg-maxi)/maxi)*100).toFixed(1);
if(z2>=0){
  z2 = z2.toString() + " % higher";
}
else{
   z2 = z2.toString() + " % lower";
}

if(maxi==sem1_avg){
  var k= "Semester-1";
}
if(maxi == sem2_avg){
    var k="Semester-2";
}
if(maxi==sem3_avg){
    var k="Semester-3";
}
  
var z3 = k + "(" + maxi + ")";


if(overall_c_avg>=50 && overall_c_avg<=61){
  var overall = ((parseInt((overall_c_avg/5)))*5)+1;
}
else{
  var overall = ((parseInt((overall_c_avg/10)))*10)+1; //91
}
var grades1={101:"O",91:'O',81:"A+",71:"A",61:"B+",56:"B",51:"C"};

if(overall >= 61 && overall <=101){
  y=10;
}
else{
  y=5;
}

var n_grade = grades1[overall+y]; 

if(n_grade == 'O' || "A+" || "A"){
  var x = y;
  if(((overall+y)-overall_c_avg)>5){
    var x = 8.5;
    if(overall <=61){
      var x = 4.5;
    }
  }
}
else{
  var x = 5;
}

var z4 = grades1[overall];
var z6 = n_grade;

if(overall>=90){
  var z5 = 0;
}
else{
  var z5 = (((overall+x) * 2 )-overall_c_avg);
}



//final table
  var dataTable4 = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, 'Semester')
    .addColumn(Charts.ColumnType.NUMBER, 'GRADE%');

  for (var i = 0; i < sem_trends.length; i++) {
    dataTable4.addRow(sem_trends[i]);
  }


var x_style = Charts.newTextStyle().setColor('green').setFontSize(25).build();
var y_style = Charts.newTextStyle().setColor('black').setFontSize(25).build();
var title_style = Charts.newTextStyle().setColor('red').setFontSize(35).build();
var x_text_style = Charts.newTextStyle().setColor('red').setFontSize(30).build();


//Bar chart-1
  var chart1 = Charts.newBarChart()
    .setDataTable(dataTable1)
    .setTitle(name+" Semester 1 performance")
    .setDimensions(1920,1080)
    .setXAxisTitle("\nYour overall Semester-1 average is between "+ sem1_avg + " to "+ (sem1_avg+9) )
    .setXAxisTextStyle(x_style)
    .setYAxisTextStyle(y_style)
    .setTitleTextStyle(title_style)
    .setXAxisTitleTextStyle(x_text_style)
    .setRange(0,100)
    .build();

//Bar chart-2
  var chart2 = Charts.newBarChart()
    .setDataTable(dataTable2)
    .setTitle(name+" Semester 2 performance")
    .setXAxisTitle("\nYour overall Semester-2 average is between "+ sem2_avg + " to "+ (sem2_avg+9) )
    .setXAxisTextStyle(x_style)
    .setYAxisTextStyle(y_style)
    .setTitleTextStyle(title_style)
    .setXAxisTitleTextStyle(x_text_style)
    .setDimensions(1920,1080)
    .setRange(0,100)
    .build();

//Bar chart-3
  var chart3 = Charts.newBarChart()
    .setDataTable(dataTable3)
    .setTitle(name+" Semester 3 performance")
    .setXAxisTitle("\nYour overall Semester-3 average is between "+ sem3_avg + " to "+ (sem3_avg+9) )
    .setXAxisTextStyle(x_style)
    .setYAxisTextStyle(y_style)
    .setTitleTextStyle(title_style)
    .setXAxisTitleTextStyle(x_text_style)
    .setDimensions(1920,1080)
    .setRange(0,100)
    .build();


//Final chart
  var chart4 = Charts.newLineChart()
    .setDataTable(dataTable4)
    .setTitle(name+ " Overall performace")
    .setXAxisTitle("\nYour semester average so far is between " + overall_avg + " to " +(overall_avg+9))
    .setXAxisTitleTextStyle(x_text_style)
    .setTitleTextStyle(title_style)
    .setXAxisTextStyle(x_style)
    .setYAxisTextStyle(y_style)
    .setDimensions(1920,1080)
    .setRange(0,100)
    .setColors(["red","green"])
    .build();


  // Get the chart image URL
  var chartBlob1 = chart1.getBlob();
  var chartBlob2 = chart2.getBlob();
  var chartBlob3 = chart3.getBlob();
  var chartBlob4 = chart4.getBlob();

  var folder = DriveApp.getFolderById("YOUR FOLDER ID"); //replace here
  var doc = DocumentApp.create(name + "_" + branch + "_assessement"),
      docFile = DriveApp.getFileById( doc.getId() );
  folder.addFile( docFile );
  DriveApp.getRootFolder().removeFile(docFile);
  
  var body = doc.getBody();

  body.setPageWidth(1920);
  body.setPageWidth(1080);
  
  body.appendImage(chartBlob1);
  body.insertPageBreak;
  body.appendImage(chartBlob2);
  body.insertPageBreak;
  body.appendImage(chartBlob3);
  body.insertPageBreak;
  body.appendImage(chartBlob4);
  body.insertPageBreak;
  final_write(body,z1,z2,z3,z4,z5,z6);
  body.insertPageBreak;
  
  // Save the document as a PDF file
  file2 = docFile.getId();
  var doc_id = doc.getId();
  doc.saveAndClose;
  
  file = DriveApp.getFileById(doc_id);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var fileId1 = doc_id;
  
  var chartUrl1 = 'https://docs.google.com/document/d/' + fileId1+"/edit";

  var url2 = "https://drive.google.com/drive/folders/YOUR_DRIVE_ID?usp=share_link"; //replace here

  // Set the confirmation message with the chart image
  //var message = name + ' Semester results Assessement is ready! \n\nSemester-1 Performance:"' + chartUrl1 +'"\n\nSemester-2 Performance:'+ chartUrl2 +'"\n\nSemester-3 Performance:'+ chartUrl3 + "\n\nOverall Performance:" + chartUrl4;

  var message = "LATEST UPDATES:\n" + name + "'s 🤓 Semester results Assessement docs is ready!🥳 :(" + chartUrl1 + ")\n\nWE ARE PROCESSING YOUR DATA (CHECK NOTE ⬇️ )\n\n\nNote📖:\n✨There may be delay of 20-25 secs for processing your data 🥺 after submitting the form. \n✨You can find drive link for all assessement docs here 👉🏻" + url2 + " within a minute of your assessement or click link in forms homepage.\n\n\nTHANK YOU:)";
  form.setConfirmationMessage(message);

}

function final_write(body,z1,z2,z3,z4,z5,z6){
  var head = "\nAssessment:";

  var p1 = "\n✨ In semester-3, your trend is  "+ z1 +" compared to the previous semester.";

  var p2 = "\n✨ You are "+ z2 +" from your overall high.";

  var p3 = "\n✨ Your best performance is in "+ z3 +".";

  var p4 = "\n✨ With the trend your average grade seems to be "+ z4 +".";

  var p5 = "\n✨ You have to score an average of >"+ z5 +"% in the next semester to get to the next grade of "    + z6 +" 🔥.";

  var f1 = "\n\nThis is just an overview of the data inferred from the graph. You can find more insights from the visualizations.\n\n Thank you for using, your suggestions are most welcome to add features.\n\nWishing you the best for next semester :)";

  var f2 = "\n\n\n Your feedback matters a lot ->"

  body.appendParagraph(head)
      .editAsText().setForegroundColor('#0000FF').setFontSize(17).setUnderline(true);
  body.appendParagraph(p1)
      .editAsText().setForegroundColor('#FF0000').setFontSize(15).setUnderline(false);
  body.appendParagraph(p2)
      .editAsText().setForegroundColor('#FF0000').setFontSize(15);
  body.appendParagraph(p3)
      .editAsText().setForegroundColor('#FF0000').setFontSize(15);
  body.appendParagraph(p4)
      .editAsText().setForegroundColor('#FF0000').setFontSize(15);
  body.appendParagraph(p5)
      .editAsText().setForegroundColor('#008000').setFontSize(15);
  body.appendParagraph(f1)
      .editAsText().setFontSize(15).setItalic(true).setForegroundColor("#000000");

  body.appendParagraph("\t\t\t\t\t\t\t\t\t~SSR")
      .editAsText().setBold(true).setForegroundColor('#CF9FFF').setFontSize(16);

  body.appendParagraph(f2)
      .editAsText().setBold(false).setForegroundColor('#000000').setFontSize(14);
  var para = body.appendParagraph("click here");
  para.setLinkUrl("https://forms.gle/KVdTCw1DgLssXmiH7");
  
}
