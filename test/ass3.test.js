import {initThirdPhaze} from '../src/js/ass3';
import assert from 'assert';


describe('Assignment 3', () => {
    // it('is parsing an empty function correctly', () => {
    //     assert.equal(returnGraphString(),'');
    // });
    it('is parsing  while in if', () => {
        assert.equal(initThirdPhaze('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '   while (a < z) {\n' +
            '       c = a + b;\n' +
            '       z = c * 2;\n' +
            '       a++;\n' +
            '   }\n' +
            'z=c;\n' +
            '    }\n' +
            ' else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } \n' +
            'else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}','1,2,3'),'op1=>operation: - 1 -\n' +
            'a=(x+1)\n' +
            'b=(a+y)\n' +
            'c=0\n' +
            '|trueClass\n' +
            'op2=>start: \'\'|trueClass\n' +
            'op3=>condition: - 2 -\n' +
            '(b<z)\n' +
            '|trueClass\n' +
            'op4=>operation: - 3 -\n' +
            'c=(c+5)\n' +
            '|falseClass\n' +
            'op5=>operation: - 4 -\n' +
            'NULL\n' +
            '|falseClass\n' +
            'op6=>condition: - 5 -\n' +
            '(a<z)\n' +
            '|falseClass\n' +
            'op7=>operation: - 6 -\n' +
            'c=(a+b)\n' +
            'z=(c*2)\n' +
            'a++\n' +
            '|falseClass\n' +
            'op8=>operation: - 7 -\n' +
            'z=c\n' +
            '|falseClass\n' +
            'op9=>condition: - 8 -\n' +
            '(b<(z*2))\n' +
            '|trueClass\n' +
            'op10=>operation: - 9 -\n' +
            'c=((c+x)+5)\n' +
            '|trueClass\n' +
            'op11=>operation: - 10 -\n' +
            'c=((c+z)+5)\n' +
            '|falseClass\n' +
            'op12=>operation: - 11 -\n' +
            'return c\n' +
            '|trueClass\n' +
            'op1->op3\n' +
            'op2->op12\n' +
            'op3(yes,right)->op4\n' +
            'op3(no)->op9\n' +
            'op4->op5\n' +
            'op5->op6\n' +
            'op6(yes,right)->op7\n' +
            'op6(no,right)->op8\n' +
            'op7->op5\n' +
            'op8->op2\n' +
            'op9(yes)->op10\n' +
            'op9(no,right)->op11\n' +
            'op10->op2\n' +
            'op11->op2\n');

    });

    it('is parsing  if in while', () => {
        assert.equal(initThirdPhaze('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            'while(c==0)\n' +
            '{\n' +
            'c=5;\n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } \n' +
            'else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } \n' +
            'else {\n' +
            '        c = c + z + 5;\n' +
            'if(c==2){\n' +
            'c=5;\n' +
            '}\n' +
            'else if(c==5){\n' +
            'c=8;\n' +
            '}\n' +
            '    }\n' +
            'z=c;\n' +
            '    }\n' +
            '    return c;\n' +
            '}','1,2,3'),'op1=>operation: - 1 -\n' +
            'a=(x+1)\n' +
            'b=(a+y)\n' +
            'c=0\n' +
            '|trueClass\n' +
            'op2=>operation: - 2 -\n' +
            'NULL\n' +
            '|trueClass\n' +
            'op3=>condition: - 3 -\n' +
            '(c==0)\n' +
            '|trueClass\n' +
            'op4=>operation: - 4 -\n' +
            'c=5\n' +
            '|trueClass\n' +
            'op5=>start: \'\'|trueClass\n' +
            'op6=>condition: - 5 -\n' +
            '(b<z)\n' +
            '|trueClass\n' +
            'op7=>operation: - 6 -\n' +
            'c=(c+5)\n' +
            '|falseClass\n' +
            'op8=>condition: - 7 -\n' +
            '(b<(z*2))\n' +
            '|trueClass\n' +
            'op9=>operation: - 8 -\n' +
            'c=((c+x)+5)\n' +
            '|trueClass\n' +
            'op10=>operation: - 9 -\n' +
            'c=((c+z)+5)\n' +
            '|falseClass\n' +
            'op11=>condition: - 10 -\n' +
            '(c==2)\n' +
            '|falseClass\n' +
            'op12=>operation: - 11 -\n' +
            'c=5\n' +
            '|falseClass\n' +
            'op13=>condition: - 12 -\n' +
            '(c==5)\n' +
            '|falseClass\n' +
            'op14=>operation: - 13 -\n' +
            'c=8\n' +
            '|falseClass\n' +
            'op15=>operation: - 14 -\n' +
            'z=c\n' +
            '|trueClass\n' +
            'op16=>operation: - 15 -\n' +
            'return c\n' +
            '|trueClass\n' +
            'op1->op2\n' +
            'op2->op3\n' +
            'op3(yes)->op4\n' +
            'op3(no)->op16\n' +
            'op4->op6\n' +
            'op5->op15\n' +
            'op6(yes,right)->op7\n' +
            'op6(no)->op8\n' +
            'op7->op5\n' +
            'op8(yes)->op9\n' +
            'op8(no,right)->op10\n' +
            'op9->op5\n' +
            'op10->op11\n' +
            'op11(yes,right)->op12\n' +
            'op11(no,right)->op13\n' +
            'op12->op5\n' +
            'op13(yes,right)->op14\n' +
            'op13(no)->op5\n' +
            'op14->op5\n' +
            'op15->op2\n');

    });

    it('is parsing  while in if', () => {
        assert.equal(initThirdPhaze('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            'let d = 2;\n' +
            '    \n' +
            'while(c==0)\n' +
            '{\n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } \n' +
            'else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            'if(c==7)\n' +
            '{\n' +
            'd=3;\n' +
            '}\n' +
            'else if(c==6)\n' +
            '{\n' +
            'd=4;\n' +
            '    } \n' +
            'else{\n' +
            'd=2;\n' +
            '}\n' +
            '}\n' +
            'else {\n' +
            '        c = c + z + 5;\n' +
            'if(c==2){\n' +
            'c=5;\n' +
            '}\n' +
            'else if(c==5){\n' +
            'c=8;\n' +
            '}\n' +
            '    }\n' +
            '    }\n' +
            '    return c;\n' +
            '}','1,2,3'),'op1=>operation: - 1 -\n' +
            'a=(x+1)\n' +
            'b=(a+y)\n' +
            'c=0\n' +
            'd=2\n' +
            '|trueClass\n' +
            'op2=>operation: - 2 -\n' +
            'NULL\n' +
            '|trueClass\n' +
            'op3=>condition: - 3 -\n' +
            '(c==0)\n' +
            '|trueClass\n' +
            'op4=>condition: - 4 -\n' +
            '(b<z)\n' +
            '|trueClass\n' +
            'op5=>start: \'\'|trueClass\n' +
            'op6=>operation: - 5 -\n' +
            'c=(c+5)\n' +
            '|falseClass\n' +
            'op7=>condition: - 6 -\n' +
            '(b<(z*2))\n' +
            '|trueClass\n' +
            'op8=>operation: - 7 -\n' +
            'c=((c+x)+5)\n' +
            '|trueClass\n' +
            'op9=>condition: - 8 -\n' +
            '(c==7)\n' +
            '|trueClass\n' +
            'op10=>operation: - 9 -\n' +
            'd=3\n' +
            '|falseClass\n' +
            'op11=>condition: - 10 -\n' +
            '(c==6)\n' +
            '|trueClass\n' +
            'op12=>operation: - 11 -\n' +
            'd=4\n' +
            '|trueClass\n' +
            'op13=>operation: - 12 -\n' +
            'd=2\n' +
            '|falseClass\n' +
            'op14=>operation: - 13 -\n' +
            'c=((c+z)+5)\n' +
            '|falseClass\n' +
            'op15=>condition: - 14 -\n' +
            '(c==2)\n' +
            '|falseClass\n' +
            'op16=>operation: - 15 -\n' +
            'c=5\n' +
            '|falseClass\n' +
            'op17=>condition: - 16 -\n' +
            '(c==5)\n' +
            '|falseClass\n' +
            'op18=>operation: - 17 -\n' +
            'c=8\n' +
            '|falseClass\n' +
            'op19=>operation: - 18 -\n' +
            'return c\n' +
            '|trueClass\n' +
            'op1->op2\n' +
            'op2->op3\n' +
            'op3(yes)->op4\n' +
            'op3(no)->op19\n' +
            'op4(yes,right)->op6\n' +
            'op4(no)->op7\n' +
            'op5->op2\n' +
            'op6->op5\n' +
            'op7(yes)->op8\n' +
            'op7(no,right)->op14\n' +
            'op8->op9\n' +
            'op9(yes,right)->op10\n' +
            'op9(no)->op11\n' +
            'op10->op5\n' +
            'op11(yes)->op12\n' +
            'op11(no,right)->op13\n' +
            'op12->op5\n' +
            'op13->op5\n' +
            'op14->op15\n' +
            'op15(yes,right)->op16\n' +
            'op15(no,right)->op17\n' +
            'op16->op5\n' +
            'op17(yes,right)->op18\n' +
            'op17(no)->op5\n' +
            'op18->op5\n');

    });

    it('is parsing  while in if', () => {
        assert.equal(initThirdPhaze('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '   while (a > z) {\n' +
            '       c = a + b;\n' +
            '       z = c * 2;\n' +
            '       a++;\n' +
            '   }\n' +
            'z=c;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}','1,2,3'),'op1=>operation: - 1 -\n' +
            'a=(x+1)\n' +
            'b=(a+y)\n' +
            'c=0\n' +
            '|trueClass\n' +
            'op2=>start: \'\'|trueClass\n' +
            'op3=>condition: - 2 -\n' +
            '(b<z)\n' +
            '|trueClass\n' +
            'op4=>operation: - 3 -\n' +
            'c=(c+5)\n' +
            '|falseClass\n' +
            'op5=>operation: - 4 -\n' +
            'NULL\n' +
            '|falseClass\n' +
            'op6=>condition: - 5 -\n' +
            '(a>z)\n' +
            '|falseClass\n' +
            'op7=>operation: - 6 -\n' +
            'c=(a+b)\n' +
            'z=(c*2)\n' +
            'a++\n' +
            '|falseClass\n' +
            'op8=>operation: - 7 -\n' +
            'z=c\n' +
            '|falseClass\n' +
            'op9=>operation: - 8 -\n' +
            'return c\n' +
            '|trueClass\n' +
            'op1->op3\n' +
            'op2->op9\n' +
            'op3(yes,right)->op4\n' +
            'op3(no)->op2\n' +
            'op4->op5\n' +
            'op5->op6\n' +
            'op6(yes,right)->op7\n' +
            'op6(no,right)->op8\n' +
            'op7->op5\n' +
            'op8->op2\n');

    });
    it('is parsing  while in if', () => {
        assert.equal(initThirdPhaze('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b > z) {\n' +
            '        c = c + 5;\n' +
            '   while (a > z) {\n' +
            '       c = a + b;\n' +
            '       z = c * 2;\n' +
            '       a++;\n' +
            '   }\n' +
            'z=c;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}','1,2,3'),'op1=>operation: - 1 -\n' +
            'a=(x+1)\n' +
            'b=(a+y)\n' +
            'c=0\n' +
            '|trueClass\n' +
            'op2=>start: \'\'|trueClass\n' +
            'op3=>condition: - 2 -\n' +
            '(b>z)\n' +
            '|trueClass\n' +
            'op4=>operation: - 3 -\n' +
            'c=(c+5)\n' +
            '|trueClass\n' +
            'op5=>operation: - 4 -\n' +
            'NULL\n' +
            '|trueClass\n' +
            'op6=>condition: - 5 -\n' +
            '(a>z)\n' +
            '|trueClass\n' +
            'op7=>operation: - 6 -\n' +
            'c=(a+b)\n' +
            'z=(c*2)\n' +
            'a++\n' +
            '|falseClass\n' +
            'op8=>operation: - 7 -\n' +
            'z=c\n' +
            '|trueClass\n' +
            'op9=>operation: - 8 -\n' +
            'return c\n' +
            '|trueClass\n' +
            'op1->op3\n' +
            'op2->op9\n' +
            'op3(yes)->op4\n' +
            'op3(no)->op2\n' +
            'op4->op5\n' +
            'op5->op6\n' +
            'op6(yes,right)->op7\n' +
            'op6(no)->op8\n' +
            'op7->op5\n' +
            'op8->op2\n');

    });
    it('is parsing  while in if', () => {
        assert.equal(initThirdPhaze('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '   while (a > z) {\n' +
            '       c = a + b;\n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } \n' +
            'else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } \n' +
            'else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '       z = c * 2;\n' +
            '       a++;\n' +
            '\n' +
            '    }\n' +
            '    return c;\n' +
            '}','1,2,3'),'op1=>operation: - 1 -\n' +
            'a=(x+1)\n' +
            'b=(a+y)\n' +
            'c=0\n' +
            '|trueClass\n' +
            'op2=>operation: - 2 -\n' +
            'NULL\n' +
            '|trueClass\n' +
            'op3=>condition: - 3 -\n' +
            '(a>z)\n' +
            '|trueClass\n' +
            'op4=>operation: - 4 -\n' +
            'c=(a+b)\n' +
            '|falseClass\n' +
            'op5=>start: \'\'|falseClass\n' +
            'op6=>condition: - 5 -\n' +
            '(b<z)\n' +
            '|falseClass\n' +
            'op7=>operation: - 6 -\n' +
            'c=(c+5)\n' +
            '|falseClass\n' +
            'op8=>condition: - 7 -\n' +
            '(b<(z*2))\n' +
            '|falseClass\n' +
            'op9=>operation: - 8 -\n' +
            'c=((c+x)+5)\n' +
            '|falseClass\n' +
            'op10=>operation: - 9 -\n' +
            'c=((c+z)+5)\n' +
            '|falseClass\n' +
            'op11=>operation: - 10 -\n' +
            'z=(c*2)\n' +
            'a++\n' +
            '|falseClass\n' +
            'op12=>operation: - 11 -\n' +
            'return c\n' +
            '|trueClass\n' +
            'op1->op2\n' +
            'op2->op3\n' +
            'op3(yes,right)->op4\n' +
            'op3(no)->op12\n' +
            'op4->op6\n' +
            'op5->op11\n' +
            'op6(yes,right)->op7\n' +
            'op6(no,right)->op8\n' +
            'op7->op5\n' +
            'op8(yes,right)->op9\n' +
            'op8(no,right)->op10\n' +
            'op9->op5\n' +
            'op10->op5\n' +
            'op11->op2\n');

    });
});