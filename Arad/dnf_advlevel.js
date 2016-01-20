var advLevelDesc=new Array("모험의 시작","실버크라운 모험단","멜트다운 모험단","표류동굴 모험단","역천의 폭포 모험단","체념의 빙벽 모험단",
"안트베르 협곡 모험단","해상열차 모험단","시간의 문 모험단","파워스테이션 모험단","노블스카이 모험단");

function dummyAction(){return;}

function initCalc(){

 var slotLine=new Array();
 var slotBox=new Array();
 var slotType=new Array();
 var slotMin=new Array();
 var slotMax=new Array();
 var slotSize=new Array();
 var lines=0;
 
 var boxPos=document.getElementById("slotBox");

 for(s=0;s<25;s++){

  slotLine[s]=document.createElement("div");
  slotLine[s].id="slotline_"+s;
  lines=(s * 4);
  for(p=lines;p<lines+4;p++){
   slotBox[p]=document.createElement("input");
   slotBox[p].id="charaslot_"+p;
   
   slotType[p]=document.createAttribute("type");
   slotType[p].value="number";
  
   slotMin[p]=document.createAttribute("min");
   slotMin[p].value="1";
   slotMax[p]=document.createAttribute("max");
   slotMax[p].value="86";
  
   slotBox[p].setAttributeNode(slotType[p]);
   slotBox[p].setAttributeNode(slotMin[p]);
   slotBox[p].setAttributeNode(slotMax[p]);
   
   slotLine[s].appendChild(slotBox[p]);

  }
  boxPos.appendChild(slotLine[s]); 
 }
 
 changeCalcMode();
}

function changeCalcMode(){
 var checkedBasic=document.getElementById("basicMode").checked;
 var checkedExtended=document.getElementById("extendedMode").checked;
 
 if(checkedBasic != false){
  for(j=25;j<100;j++){
   document.getElementById("charaslot_"+j).value="";
   document.getElementById("charaslot_"+j).style.display="none";
  }
 }else if(checkedExtended != false){
  for(j=25;j<100;j++){document.getElementById("charaslot_"+j).style.display="inline";}
 }
}

function calcAdventureLevel(){

 var advExp=0;
 var advLevel=0;
 var nextLevelExp=0;
 var levelData=new Array();
 var charaLevel=new Array();
 var curLevelExp=0;
 var curLevelExpPercentage=0;
 var validCount=0;
 var advCount=0;
 var supporterCount=0;
 var mercenaryCount=0;
 var levelSum=0;
 var levelMean=0;
 
 for(i=0;i<100;i++){
  levelData[i]=document.getElementById("charaslot_"+i);
  if(levelData[i].value.length != 0){validCount++;}
  charaLevel[i] = new Number(levelData[i].value);
  if(charaLevel[i] < 40){advExp+=0;}
  else if(charaLevel[i] >= 40 && charaLevel[i] <= 86){
   if(charaLevel[i] >= 40){advCount++;}
   if(charaLevel[i] >= 50){supporterCount++;}
   if(charaLevel[i] >= 70){mercenaryCount++;}
   levelSum+=charaLevel[i];
   for(j=40;j<=charaLevel[i];j++){
    if(j <= 70){advExp+=100+(5 * (j-40));}
	else if(j >= 71){advExp+=250+(10 * (j-70));}
   }
  }else{alert("캐릭터 최대 레벨은 86입니다.");return false;}
 }

 if(advExp < 1375){advLevel=0;nextLevelExp=Math.abs(advExp-1375);curLevelExp=(1375-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 1375));}
 else if(advExp >= 1375 && advExp < 5425){advLevel=1;nextLevelExp=Math.abs(advExp-5425);curLevelExp=(4050-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 4050));}
 else if(advExp >= 5425 && advExp < 10850){advLevel=2;nextLevelExp=Math.abs(advExp-10850);curLevelExp=(5425-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 5425));}
 else if(advExp >= 10850 && advExp < 21700){advLevel=3;nextLevelExp=Math.abs(advExp-21700);curLevelExp=(10850-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 10850));}
 else if(advExp >= 21700 && advExp < 37975){advLevel=4;nextLevelExp=Math.abs(advExp-37975);curLevelExp=(16275-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 16275));}
 else if(advExp >= 37975 && advExp < 54250){advLevel=5;nextLevelExp=Math.abs(advExp-54250);curLevelExp=(16275-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 16275));}
 else if(advExp >= 54250 && advExp < 75950){advLevel=6;nextLevelExp=Math.abs(advExp-75950);curLevelExp=(21700-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 21700));}
 else if(advExp >= 75950 && advExp < 101575){advLevel=7;nextLevelExp=Math.abs(advExp-101575);curLevelExp=(25625-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 25625));}
 else if(advExp >= 101575 && advExp < 133725){advLevel=8;nextLevelExp=Math.abs(advExp-133725);curLevelExp=(32150-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 32150));}
 else if(advExp >= 133725 && advExp < 175350){advLevel=9;nextLevelExp=Math.abs(advExp-175350);curLevelExp=(41625-nextLevelExp);curLevelExpPercentage=(100 * (curLevelExp / 41625));}
 else{advLevel=10;nextLevelExp="(없음)";curLevelExp=0;curLevelExpPercentage=0;}
 
 levelMean=(Math.floor((levelSum / validCount) * 100) / 100);
 curLevelExpPercentage=(Math.floor(curLevelExpPercentage * 100) / 100);
 
 
 document.getElementById("out_result").innerHTML="당신의 모험단 레벨은 Lv."+advLevel+"("+advLevelDesc[advLevel]+", 총 경험치 "+advExp+", 현재 레벨 경험치 "+curLevelExpPercentage+"&#37;)이며, 다음 모험단 레벨까지 남은 경험치는 "+nextLevelExp+"입니다.";
 document.getElementById("out_count").innerHTML="보유 캐릭터 "+validCount+"개 중 모험단 레벨에 반영되는 캐릭터는 "+advCount+"개, 지원병으로 사용가능한 캐릭터는 "+supporterCount+"개, 용병으로 사용가능한 캐릭터는 "+mercenaryCount+"개이며, 평균 레벨은 "+levelMean+"입니다.";

}

function resetResult(){
 document.getElementById("out_result").innerHTML="";
 document.getElementById("out_count").innerHTML="";
}

function resetForm(){
 resetResult();
 changeCalcMode();
}