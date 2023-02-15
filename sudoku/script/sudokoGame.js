arr= []; // this array is to store the pre given box location  
var isNewGame = false; // it is to store the state of the game that means is the new game is started or not
var isGameStart = false;

var choosenBox = ""; 
var choosenNumber = "";

// creating two dimensional array named board 
const board = new Array(9);

for(var i=0;i<9;i++)
    board[i] = new Array(9);



function safeCheck(num,r,c)
{
    // check horizontally
    for(var i=0;i<=8;i++)
    {
        if(board[r][i]==num)
            return false;
    }

    // check vertically
    for(var i=0;i<=8;i++)
    {
        if(board[i][c]==num)
            return false;
    }

    // check in the box
    for(var i=r-(r%3);i<=(r-(r%3)+2);i++)
    {
        for(var j=c-(c%3);j<=(c-(c%3)+2);j++)
        {
            if(board[i][j]==num)
                return false;
        }
    }

    return true;
}



function puzzle()
{   
    // these two random values are for choosing random cells in the board
    var i=1;
    var match = false; // this match variable is to check whether we choose the box which had already selected
    isNewGame = true; // it stores is it is a new game or not to give permission to start the timer
    
    isGameStart = false;
    document.getElementById("countDivId").innerText="00:00:00"; // reseting the timer for the new game

    // reseting the board
    for(var index=0;index<arr.length;index++)
    {
        document.getElementById(arr[index]).innerText="";
    }

    // reseting
    arr = [];

    // reseting the board array
    for(var k=0;k<9;k++)
    {
        for(var j=0;j<9;j++)
        {
            board[k][j]=0;
        }
    }

    console.log(board);
    do{
        
        match = false;
        first = Math.floor(Math.random()*9);
        second = Math.floor(Math.random()*9);

        for(var index=0;index<arr.length;index++)
        {
            if(arr[index].localeCompare(("box"+first+second)) == 0)
            {
                match = true; // if we found a match i.e. it is true
                break;
            }
        }


        // And if we don't find a match then we push the unique box id in the array named arr
        if(!match)
        {
            arr.push("box"+first+second);
            i++;
        }
    }
    while(i<=33);

    

    for(var index=0;index<arr.length;)
    {   
        var number = Math.floor(Math.random()*9)+1;
        
        if(safeCheck( number, parseInt(arr[index].charAt(3)), parseInt(arr[index].charAt(4)))) // checking is the position is correct with this random number
        {
            board[parseInt(arr[index].charAt(3))][parseInt(arr[index].charAt(4))]=number;
            document.getElementById(arr[index]).style.backgroundColor="rgba(246, 120, 3, 0.3)";
            document.getElementById(arr[index]).innerText=number;
            index++;
        }
    }
    
}

function timer(timerId)
{
    var count = document.getElementById("countDivId").innerText;

    if(isNewGame)
    {   
        isGameStart = true;
        
        if(parseInt(count.charAt(7)) < 9 )
        {
            document.getElementById("countDivId").innerText=count.substring(0,7)+(parseInt(count.charAt(7))+1);
        }
        else{

            if(parseInt(count.charAt(6)) < 5 )
                document.getElementById("countDivId").innerText=count.substring(0,6)+(parseInt(count.charAt(6))+1)+"0";
            else{

                if(parseInt(count.charAt(4)) < 9)
                    document.getElementById("countDivId").innerText=count.substring(0,4)+(parseInt(count.charAt(4))+1)+":00";
                else{

                    if(parseInt(count.charAt(3)) < 5)
                        document.getElementById("countDivId").innerText=count.substring(0,3)+(parseInt(count.charAt(3))+1)+"0:00";
                    else{

                        if(parseInt(count.charAt(1)) < 9)
                            document.getElementById("countDivId").innerText=count.substring(0,1)+(parseInt(count.charAt(1))+1)+":00:00";
                        else{
                            document.getElementById("countDivId").innerText=(parseInt(count.charAt(0))+1)+"0:00:00";
                        }
                    }
                }
            }
        }
    }
    else{
        clearInterval(timerId);
    }
}


function chooseBoxFun(boxId)
{   
    if(isNewGame && isGameStart)
    {   
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i].localeCompare(boxId) == 0)
            {
                return;
            }
        }   
        

        if(choosenBox.localeCompare("") != 0 && "rgba(211, 15, 15, 0.843)".localeCompare(document.getElementById(choosenBox).style.backgroundColor) !=0)
        {   
            document.getElementById(choosenBox).style.backgroundColor="white";
        }

        choosenBox = boxId;

        if("rgba(211, 15, 15, 0.843)".localeCompare(document.getElementById(choosenBox).style.backgroundColor) !=0)
            document.getElementById(choosenBox).style.backgroundColor="rgba(184, 184, 184, 0.425)";
        
    }
}

function chooseNumberFun(numberId)
{
    if(isNewGame && isGameStart)
    {
        if(choosenBox.localeCompare("") != 0)
        {   

            document.getElementById(choosenBox).innerText=document.getElementById(numberId).innerText;

            if(!safeCheck(parseInt(document.getElementById(numberId).innerText), parseInt(choosenBox.charAt(3)), parseInt(choosenBox.charAt(4))))
            {
                document.getElementById(choosenBox).style.backgroundColor="rgba(211, 15, 15, 0.843)";
            }
            else{
                document.getElementById(choosenBox).style.backgroundColor="white";
            }
            
            
            board[parseInt(choosenBox.charAt(3))][parseInt(choosenBox.charAt(4))]=parseInt(document.getElementById(numberId).innerText);
            
        }
    }
}