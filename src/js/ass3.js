import {parseCode, returnifs, initAll, reteurnIfLiens,finellize} from './code-analyzer';

let parsedCode;
let parsedCodeInDic = new Map();
let ifs;
let ifLines;
let functionDeclarationLine;
let nodeIndex=1;
let regularStatments = new Set;
let nodes = [];
let nodesIndexes = [];
let graphString ='';



function initThirdPhaze(codeToParse,params)
{
    finellize();
    finellizeThirdPhaze();
    parsedCode = parseCode(codeToParse,1);
    parsedCode = SortParsed(parsedCode);
    parsedToDic(parsedCode);
    initAll(codeToParse,params);
    ifs = returnifs();
    ifLines = reteurnIfLiens();
    return thirdPhaze();
}

function SortParsed(parsedarrNew) {
    parsedarrNew.sort(function(a, b){return a.Line - b.Line;});
    return parsedarrNew;
}


function parsedToDic(parsedCode) {
    for (let line of parsedCode)
    {
        parsedCodeInDic.set(line.Line,line);
        if(line.Type == 'FunctionDeclaration')
            functionDeclarationLine = line.Line;
    }
    for (let line of parsedCodeInDic.keys())
    {
        if(line == functionDeclarationLine)
            parsedCodeInDic.delete(line);
    }

}

function nextLine(index) {
    if(index == parsedCode[parsedCode.length-1].Line)
        return index+1;
    for (let i=0; i<parsedCode.length-1; i++)
    {
        if(parsedCode[i].Line == index)
        {
            while (parsedCode[i+1].Line == parsedCode[i].Line)
            {
                i++;
            }
            return parsedCode[i+1].Line;
        }
    }

}

function initNewNode(lines,type,boolValue,startLine) {
    let node = {};
    node.StartLine = startLine;
    node.Index = nodeIndex;
    nodeIndex++;
    node.Lines = lines;
    node.BoolValue = boolValue;
    if(type == 'circle')
        node.Type = 'circle';
    else if(type != 'if statement' && type != 'else if' && type != 'while statement')
        node.Type = 'square';
    else
        node.Type = 'cond';
    return node;
}

function thirdPhaze() {
    regularStatments.add('assignment expression');
    regularStatments.add('return statement');
    regularStatments.add('Update Expression');
    regularStatments.add('variable declaration');
    let firstLine = nextLine(functionDeclarationLine);
    let endLine = parsedCode[parsedCode.length-1].Line;
    let line = parsedCodeInDic.get(firstLine);
    let node;
    node =  initNewNode([],line.Type,true,firstLine);
    //nodes.push(node);
    recursive(node,firstLine,endLine,null);
    initboolValueToNodes(node);
    initNodes(node);
    setNodes();
    getGraphString();
    //console.log(graphString);
    finellize();
    return graphString;
}

function initboolValueToNodes(node) {
    //if(node.BoolValue ==true)
    //{
    let con = ifLinesNodeInclude(node,'return');
    if(!con)
    {
        initboolValueToNodesOne(node);

    }
    else
        node.BoolValue = true;
}

function initboolValueToNodesOne(node) {
    if(node.Type == 'circle' || node.Type == 'square')
    {
        node.BoolValue = true;
        let nullExist = ifLinesNodeInclude(node.Next,'NULL');
        if( !nullExist || !node.Next.BoolValue)
            initboolValueToNodes(node.Next);
    }
    else //if(node.Type == 'cond')
        initboolValueToNodesTwo(node);
}

function initboolValueToNodesTwo(node) {
    node.BoolValue = true;
    if(ifLines.get(node.StartLine).Type == 'while')
    {
        node.NextFalse.BoolValue = true;
        initboolValueToNodes(node.NextFalse);
        let ans = ifs.get(node.StartLine);
        if(ans)
        {node.NextTrue.BoolValue = true;
            initboolValueToNodes(node.NextTrue);}
    }
    else
    {let ans = ifs.get(node.StartLine);
        if(ans)
        {node.NextTrue.BoolValue = true;
            initboolValueToNodes(node.NextTrue);
        }
        else
        {node.NextFalse.BoolValue = true;
            initboolValueToNodes(node.NextFalse);}}}





function ifLinesNodeInclude(node,toFind) {
    for (let line of node.Lines)
    {
        if(line.includes(toFind))
            return true;
    }
    return false;

}





function recursive(node, startLine, endLine,next) {
    let curr = startLine;
    while (curr<=endLine)
    {
        node.Next = next;
        if(parsedCodeInDic.get(curr).Type == 'else')
            curr = nextLine(curr);
        while(curr<=endLine && regularStatments.has(parsedCodeInDic.get(curr).Type))
        {
            let line =findLine(parsedCodeInDic.get(curr));
            node.Lines.push(line);
            curr = nextLine(curr);
        }
        if(curr<= endLine && ifLines.get(curr)!= undefined && ifLines.get(curr).Type == 'if')
        {
            let ifNode;
            let nextNode;
            if(next != undefined && next.Type == 'circle' && findLastLineOfBrother(curr)==endLine)
                nextNode = next;
            else
                nextNode = initNewNode([],'circle',false,-1);
            if(node.Lines.length==0)
            {
                node.Lines.push(parsedCodeInDic.get(curr).Condition);
                ifNode = node;
                node.Next = null;
            }
            else
            {
                ifNode = initNewNode([parsedCodeInDic.get(curr).Condition],parsedCodeInDic.get(curr).Type,false,curr);
                node.Next = ifNode;
            }
            let nextTrue = initNewNode([],parsedCodeInDic.get(nextLine(curr)).Type,false,nextLine(curr));
            ifNode.NextTrue = nextTrue;
            recursive(nextTrue , nextLine(curr),ifLines.get(curr).End,nextNode);
            let existElse = findFalseNode(curr);
            if(existElse != -1)
            {
                let nextFalse = initNewNode([],parsedCodeInDic.get(existElse).Type,false,existElse);
                ifNode.NextFalse = nextFalse;
                recursive(nextFalse , existElse,ifLines.get(existElse).End,nextNode );
            }
            else
                ifNode.NextFalse = nextNode;
            curr = findLastLineOfBrother(curr);
            curr = nextLine(curr);
            if(curr <= endLine) {
                let currNode = initNewNode([], parsedCodeInDic.get(curr).Type, false, curr);
                nextNode.Next = currNode;
                node = currNode;
            }
            else
            {
                if( next!= null && next.Lines[0] == 'NULL')
                    nextNode.Next = next;
            }

        }
        else if (curr<= endLine && ifLines.get(curr)!= undefined &&  ifLines.get(curr).Type == 'else if' )
        {
            //let ifNode = initNewNode(parsedCodeInDic.get(curr).Condition,parsedCodeInDic.get(curr).Type,false,curr);
            node.Lines.push(parsedCodeInDic.get(curr).Condition);
            let nextTrue = initNewNode([],parsedCodeInDic.get(nextLine(curr)).Type,false,nextLine(curr));
            node.NextTrue = nextTrue;
            recursive(nextTrue , nextLine(curr),ifLines.get(curr).End,next);
            let existElse = findFalseNode(curr);
            if(existElse != -1)
            {
                let nextFalse = initNewNode([],parsedCodeInDic.get(existElse).Type,false,existElse);
                node.NextFalse = nextFalse;
                recursive(nextFalse , existElse,ifLines.get(existElse).End,next );
            }
            else//
                node.NextFalse = next;//
            node.Next = null;
            curr = nextLine(endLine);
        }
        else if(curr<= endLine && parsedCodeInDic.get(curr).Type == 'while statement')
        {
            //let nextNode = initNewNode([],'circle',false,-1);
            let nullNode = initNewNode(['NULL'],'assignment expression',false,curr);
            let ifNode = initNewNode([parsedCodeInDic.get(curr).Condition],parsedCodeInDic.get(curr).Type,false,curr);
            let nextTrue = initNewNode([],parsedCodeInDic.get(nextLine(curr)).Type,false,nextLine(curr));
            nullNode.Next = ifNode;
            ifNode.NextTrue = nextTrue;
            recursive(nextTrue , nextLine(curr),ifLines.get(curr).End,nullNode);
            node.Next = nullNode;
            curr = nextLine(ifLines.get(curr).End);//if(curr <= endLine)///////frontal
            {let currNode = initNewNode([],parsedCodeInDic.get(curr).Type,false,curr);
                ifNode.NextFalse = currNode;
                node = currNode;}

        }
    }
}

function findLine(line)
{
    let newLine = '';
    if(line.Type == 'assignment expression' || line.Type == 'variable declaration')
        newLine = line.Name + '=' + line.Value;
    else if (line.Type == 'return statement')
        newLine =  'return ' + line.Value;
    else
        newLine =  line.Name;
    return newLine;
}

function findFalseNode(ifLine) {
    //let newNode;
    for(let ifstaement of ifLines.keys())
    {
        if(ifLines.get(ifstaement).Ifline == ifLine )
        {
            //newNode = initNewNode(ifstaement,[],ifLines.get(ifstaement).Type);
            //return newNode;
            return ifstaement;
        }
    }
    return -1;
    //newNode = initNewNode(ifLines.get(node.StartLine).End,[],'circle');
    //return newNode;

}
function findLastLineOfBrother(line) {
    let end = ifLines.get(line).End;
    for(let ifStatment of ifLines.keys())
    {
        if(ifLines.get(ifStatment).Ifline == line)
        {
            end = ifLines.get(ifStatment).End;
            line = ifStatment;
        }
    }
    return end;
}

function initNodes(node) {
    if(node != undefined || node != null)
    {
        if(nodes[node.Index]== undefined)
        {
            nodes[node.Index] = node;
            initNodes(node.Next);
            initNodes(node.NextTrue);
            initNodes(node.NextFalse);
        }
    }
}

function setNodes() {
    initNodesIndexes();
    for(let i=1; i<nodes.length; i++)
    {
        if(nodes[i].Type == 'circle' && i<nodes.length)
        {
            for(let j=i; j<nodes.length; j++)
            {
                nodesIndexes[j] =  nodesIndexes[j]-1;
            }
        }
    }
}

function initNodesIndexes() {
    for(let i=1; i<nodes.length; i++)
    {
        nodesIndexes[i] = nodes[i].Index;
    }
}

function getLinesFromNode(node) {
    let concat='';//'- ' + node.Index + ' -' + '\n';
    for (let line of node.Lines)
        concat += line + '\n';
    return concat;
}

function getNodeColor(node)
{
    if(node.BoolValue)
        return 'trueClass';
    else
        return 'falseClass';
}

function getGraphString() {
    for (let i=1;i<nodes.length;i++)
    {
        let currNode = nodes[i];
        //if (currNode == undefined)
        //    continue;
        let nodeColor=getNodeColor(currNode);
        let lines = '- ' + nodesIndexes[i] + ' -' +'\n' + getLinesFromNode(currNode);
        if (currNode.Type=='square')
            graphString+= 'op' + currNode.Index + '=>operation: ' + lines+ '|' + nodeColor + '\n';
        else if (currNode.Type== 'cond')
            graphString += 'op' + currNode.Index + '=>condition: ' + lines + '|' + nodeColor + '\n';
        else
            graphString += 'op' + currNode.Index + '=>start: \'\'|' + nodeColor + '\n';
    }
    ContinueGraphString();
}

function  ContinueGraphString() {
    for (let i=1 ; i<nodes.length ; i++) {
        let currNode = nodes[i];
        //if (node==undefined)
        //    continue;
        var nodeName = 'op' + currNode.Index;
        if (currNode.Type == 'cond') {
            initCondEdges(currNode.NextTrue,nodeName,'yes');
            initCondEdges(currNode.NextFalse,nodeName,'no');
        }
        else
        {
            if (currNode.Next != undefined || currNode.Next != null)
            {
                let next = 'op' + currNode.Next.Index;
                graphString += nodeName+'->' + next + '\n';
            }
        }
    }
}

function initCondEdges(node ,name, where)///////frontal
{
    // if (node != undefined || node != null)
    {
        let currName ='op'+node.Index;
        if (node.BoolValue)
            graphString += name + '(' + where + ')->' + currName + '\n';
        else
            graphString += name + '(' + where + ',right)->' + currName + '\n';
    }
}

// function returnGraphString() {
//     return graphString;
// }

function finellizeThirdPhaze() {
    parsedCode = [];
    parsedCodeInDic = new Map();
    //let ifs;
    //let ifLines;
    functionDeclarationLine = -1;
    nodeIndex=1;
    regularStatments = new Set;
    nodes = [];
    graphString ='';
    nodesIndexes = [];
}

export {initThirdPhaze};
//export {returnGraphString};