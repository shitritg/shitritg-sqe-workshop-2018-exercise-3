import $ from 'jquery';
import {retuenLinesToShow,initAll,returnStay,returnifs} from './code-analyzer';
import {initThirdPhaze} from './ass3';
import * as flowchart from 'flowchart.js';


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let table2 = document.getElementById('SubTable');
        while (table2.rows.length > 0)
            table2.deleteRow(0);
        document.getElementById('graph').innerHTML = '';
        let codeToParse = $('#codePlaceholder').val();
        let params = $('#params').val();
        //phazeOne(codeToParse);
        phazeTwo(codeToParse,params);
        let graphString = initThirdPhaze(codeToParse,params);
        initGraph(graphString);
        //let linesToShow = retuenLinesToShow();
        //let stay = insertToLinesNotToStay(parsedCode);
        //let final = parseCode(codeToParse,2);
        //let codeToshow = retuenLinesToShow();
        //$('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        //showTable(parsedCode);
    });
});

function initGraph(graphString)
{var graph = flowchart.parse(graphString);
    graph.drawSVG('graph', {
        'x': 100, 'y': 0,
        'line-width': 4, 'line-length': 70,
        'text-margin': 15,
        'font-size': 14, 'font-color': 'black',
        'line-color': 'black', 'element-color': 'black',
        'fill': '',
        'yes-text': 'T', 'no-text': 'F',
        'arrow-end': 'block', 'scale': 1.1,
        'symbols': {
            'start': {
                'font-color': 'transparent'
            }
        },
        'flowstate' : {
            'trueClass' : { 'fill' : 'green'}, 'falseClass': {'fill' : 'red'}
        }
    });}

// function phazeOne(codeToParse) {
//     let parsedCode = parseCode(codeToParse,1);
//     showTable(parsedCode);
//     finellize();
// }

function phazeTwo(codeToParse,params) {
    initAll(codeToParse,params);
    insertToSubTable(returnStay(),retuenLinesToShow(),returnifs());
}


// function showTable(parsedarr) {
//     let table = document.getElementById('res');
//     for (let i = 0; i< parsedarr.length; i++)
//     {
//         let row = table.insertRow(i+1);
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         let cell3 = row.insertCell(2);
//         let cell4 = row.insertCell(3);
//         let cell5 = row.insertCell(4);
//         cell1.textContent = parsedarr[i].Line;
//         cell2.textContent = parsedarr[i].Type;
//         cell3.textContent = parsedarr[i].Name;
//         cell4.textContent = parsedarr[i].Condition;
//         cell5.textContent = parsedarr[i].Value;
//     }
// }

function insertToSubTable(stay,codeToShow,ifs) {
    let counter =0;
    let code = '';
    let originalCode = ($('#codePlaceholder').val()).split('\n');
    let subTable = document.getElementById('SubTable');
    for (let i = 0; i< originalCode.length; i++) {
        let color = '';
        if(!stay.has(i+1))
        {
            let row = subTable.insertRow(counter);
            let line = findLine(codeToShow,i+1);
            if (line != null)
            {code = theLine(originalCode[i],line);
                color = findColor(line,ifs);}
            else
                code = originalCode[i];
            row.textContent = code;
            if(color != '')
                row.className = color;
            counter++;}}}

function  findColor(line,ifs) {
    if(ifs.get(line.Line) != undefined)
    {
        if(ifs.get(line.Line))
            return 'trueClass';
        else
            return 'falseClass';
    }
    else return '';
}

function  theLine(originalCode,codeToShow) {
    originalCode = temp(originalCode,codeToShow);
    if(codeToShow.Type == 'return statement')
    {
        let i = originalCode.indexOf('return');
        originalCode = originalCode.substring(0,i+7) + codeToShow.Value;
    }
    if(codeToShow.Type == 'if statement' || codeToShow.Type == 'while statement')
    {
        let i = originalCode.indexOf('(');
        let j = originalCode.indexOf(')');
        originalCode = originalCode.substring(0,i+1) + codeToShow.Condition + originalCode.substring(j);
    }
    return originalCode;
}
function  temp(originalCode,codeToShow) {
    if(codeToShow.Type == 'variable declaration' || codeToShow.Type == 'assignment expression' )
    {
        let i = originalCode.indexOf('=');
        originalCode = originalCode.substring(0,i+1) + codeToShow.Value;
    }
    return originalCode;
}


function findLine(arr, line) {
    for(let i of arr)
    {
        if(i.Line == line)
            return i;
    }
    return null;
}
export {initAll};