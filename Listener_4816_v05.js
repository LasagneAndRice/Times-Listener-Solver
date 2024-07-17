
/*
This script is a solver for the Times Listener Crossword No 4816 - Transformation by Elap. It is a mostly computational solver, but as the digits of clues are solved (by filling in other clues) I will be entering these manually. There's further scope to connect the clues together by their overlapping digits.

The crossword is a mathematical one. The rules are as follows:
Each clue is a normal algebraic expression for the value to be entered, with the number of digits given in brackets. The 28 letters in the clues stand for different cubes that are greater than 1 and less than 100,000. The clues contain only letters, not digits; the lower-case letters are in italics for legibility. Sorted by numeric value, the clue letters will give a two-part message. The first part explains how to change each digit in the grid and the second part explains how solvers must replace the result of that. All the grid entries are different and none of them starts with a zero.
*/

// Initial steps. Create an array of the cube numbers greater than 1 and less than 100,000. Every letter will be assigned this array as possible solutions.
let num = 2;
let cube = 1;
const cubeArr = [];
while (cube < 100000) {
    cube = num ** 3;
    cubeArr.push(cube);
    num++;
}
cubeArr.pop(); // pop gets rid of 47^3, which is the first cube above 100,000

// Creating an object that contains each of the 28 letters and assigning them the possible solutions of the cube numbers above.
const letterKeys = ['T', 'W', 'y', 'b', 'I', 'N', 'E', 'S', 'D', 'o', 'Y', 'i', 'J', 's', 'd', 'e', 'P', 'U', 'B', 'l', 'H', 'A', 'G', 'R', 'O', 'L', 't', 'F'];

const lettersObj = Object.fromEntries(letterKeys.map(key => [key, cubeArr]));

// Creating an object that contains each clue, its letters (which can be used as keys for the letters object), the clue expression as a function (e.g. 1 across is T + T + W + y), and the digits written in the form, [-1,-1,-1] for a three digit clue. -1 indicates that the digit is unknown, and can be manually changed to a known digit, such as 3.
const cluesObj = {
    acr1: {
        lettersArr: ['T','W','y'],
        expr(T,W,y) {
            return 2 * T + W + y;
        },
        digitArr: [-1,-1,-1,-1,-1]
    },
    acr7: {
        lettersArr: ['b'],
        expr(b) {
            return 2 * b;
        },
        digitArr: [-1,-1]
    },
    acr9: {
        lettersArr: ['I','N'],
        expr(I,N) {
            return I + N;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr10: {
        lettersArr: ['E','S','T'],
        expr(E,S,T) {
            return E + S + 2 * T;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr11: {
        lettersArr: ['D','o','Y'],
        expr(D,o,Y) {
            return D - 2 * o - Y;
        },
        digitArr: [-1,-1,-1]
    },
    acr12: {
        lettersArr: ['i','J','E'],
        expr(i,J,E) {
            return i + J - 2 * E;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr13: {
        lettersArr: ['i','s','N'],
        expr(i,s,N) {
            return i + 2 * s - N;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr14: {
        lettersArr: ['d','e','P'],
        expr(d,e,P) {
            return d - 2 * e - P;
        },
        digitArr: [-1,-1,-1]
    },
    acr15: {
        lettersArr: ['b','U','Y'],
        expr(b,U,Y) {
            return b + 2 * U + Y;
        },
        digitArr: [-1,-1,-1]
    },
    acr17: {
        lettersArr:['B','l','s'],
        expr(B,l,s) {
            return B - 2 * l - s;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr19: {
        lettersArr:['H','E','l'],
        expr(H,E,l) {
            return H - E - l;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr20: {
        lettersArr:['S','U'],
        expr(S,U) {
            return S - U;
        },
        digitArr: [-1,-1,-1]
    },
    acr22: {
        lettersArr:['U','y','E'],
        expr(U,y,E) {
            return 2 * U + y - E;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr23: {
        lettersArr:['A','G'],
        expr(A,G) {
            return A - 2 * G;
        },
        digitArr: [-1,-1,-1,-1]
    },
    acr24: {
        lettersArr:['b','J'],
        expr(b,J) {
            return b + J;
        },
        digitArr: [-1,-1]
    },
    acr25: {
        lettersArr:['D','S','Y'],
        expr(D,S,Y) {
            return D - S - Y;
        },
        digitArr: [-1,-1,-1,-1,-1]
    },
    dow2: {
        lettersArr:['U','b'],
        expr(U,b) {
            return U - b;
        },
        digitArr: [-1,-1,-1]
    },
    dow3: {
        lettersArr:['R','O'],
        expr(R,O) {
            return R - O;
        },
        digitArr: [-1,-1,-1,-1]
    },
    dow4: {
        lettersArr:['s','T'],
        expr(s,T) {
            return 2 * s - T;
        },
        digitArr: [-1,-1]
    },
    dow5: {
        lettersArr:['N','s','J'],
        expr(N,s,J) {
            return N * s - J;
        },
        digitArr: [-1,-1,-1,-1,-1,-1]
    },
    dow6: {
        lettersArr:['E','L'],
        expr(E,L) {
            return E + L;
        },
        digitArr: [-1,-1,-1,-1]
    },
    dow7: {
        lettersArr:['Y'],
        expr(Y) {
            return Y ** 3;
        },
        digitArr: [-1,-1,-1,-1,-1]
    },
    dow8: {
        lettersArr:['B','P','o'],
        expr(B,P,o) {
            return B * P + 2 * o;
        },
        digitArr: [-1,-1,-1,-1,-1,-1,-1]
    },
    dow9: {
        lettersArr:['E','t','L'],
        expr(E,t,L) {
            return E * t + E + L;
        },
        digitArr: [-1,-1,-1,-1,-1,-1,-1]
    },
    dow12: {
        lettersArr:['b','F','S'],
        expr(b,F,S) {
            return b * F + F + S;
        },
        digitArr: [-1,-1,-1,-1,-1,-1]
    },
    dow13: {
        lettersArr:['J','e','B'],
        expr(J,e,B) {
            return J ** 2 + e + B;
        },
        digitArr: [-1,-1,-1,-1,-1]
    },
    dow16: {
        lettersArr:['i','J'],
        expr(i,J) {
            return i + J;
        },
        digitArr: [-1,-1,-1,-1]
    },
    dow18: {
        lettersArr:['B','J','E'],
        expr(B,J,E) {
            return B + 2 * J - E;
        },
        digitArr: [-1,-1,-1,-1]
    },
    dow21: {
        lettersArr:['P','T','s'],
        expr(P,T,s) {
            return P + T - s;
        },
        digitArr: [-1,-1,-1]
    },
    dow23: {
        lettersArr:['U','Y'],
        expr(U,Y) {
            return U - Y;
        },
        digitArr: [-1,-1]
    }
}

// doDigitsMatch takes a test number, and an array of digits (e.g. [-1,-1,3], where -1 means unknown digit and 3 is a known digit), and checks if the test number fits into the solution
const doDigitsMatch = (test, clueDigitsArr) => {
    const testDigitsArr = test.toString().split('').map(Number);
    if (test < 0 || testDigitsArr.length !== clueDigitsArr.length) { // if the test number < 0, or the length of the test number is not equal to the number of digits for the clue, return false
        return false;
    } else {
        for (index in clueDigitsArr) {
            if (clueDigitsArr[index] >= 0) { // ignore those -1 entries that mean we don't know the digit yet
                if (testDigitsArr[index] !== clueDigitsArr[index]) { // if this digit of the test number doesn't match the corresponding known digit of the solution, return false
                    return false;
                }
            }
        }
        return true; // if it passes the test for each digit and has the right number of digits, return true
    }
}

// iterateSolutionThroughAllClues does the solveCheckAndEliminate function for each letter in each clue
iterateSolutionThroughAllClues = (numIter) => {
    console.log('Initiating big solve')
    for (let ii = 0; ii < numIter; ii++) { // do it multiple times so that the letters that are solved at the end of the run can help out in evaluating letters at the start.
        for (let clue in cluesObj) { // for each clue in the clues object
            const {lettersArr: clueLettersArr, expr: clueExpr, digitArr: clueDigitsArr} = cluesObj[clue];
            for (let jj = 0; jj < clueLettersArr.length; jj++) { 
                const otherLettersArr = [...clueLettersArr];
                const targetLetter = otherLettersArr.splice(jj,1)[0]; // for each letter in each clue (targetLetter), and considering the other letters in that clue (otherLettersArr)
                solveCheckAndEliminate(targetLetter, clueExpr, otherLettersArr, jj, clueDigitsArr) // do the solveCheckAndEliminate function
            }
        }
    }
}

/*
solveClueLoop is an iterative loop, which works out which possible cubes a target letter can be given the remaining possible other letters in the clue
Its arguments are:
- targetLetter: a string for the target letter, used as a key for lettersObj
- expr: the clue expression
- otherLettersArr: an array of strings, which are the other letters involved in this clue, and are used as keys for lettersObj
- targetLetterIndex: this indexes where in the expressions arguments is the target letter located, e.g. if it's the first argument, then targetLetterIndex = 0
- clueDigitsArr: the array of known and unknown digits in the clue
- index: this indexes otherLettersArray; initially 0, this goes up by 1 in each iteration of the loop until it reaches the end of the other letters
- args: initially an empty array, but with each loop iteration has the value for the current other letter apended to it
- result: this array is what is returned by solveClueLoop when it contains all remaining possible values of the target letter; initially empty, for every combination of values that the letters in the expression can take which fit the solution, the corresponding value for the target letter is apended (repeats are removed)
*/
const solveClueLoop = (targetLetter, expr, otherLettersArr, targetLetterIndex, clueDigitsArr, index = 0, args = [], result = []) => {
    if (index === otherLettersArr.length) { // if we've got to the end of the otherLetters, then we can stop and evaluate whether the solution to the expression fits the clueDigitsArr
        return lettersObj[targetLetter].filter( // from the target letter, filter out any solutions where the digits don't match with clueDigitsArr
            letter => {
                const clueArgs = [...args]; // args is an array of the values for the otherLetters
                clueArgs.splice(targetLetterIndex,0,letter); // clueArgs is an array of the values for all letters to be passed into expr
                return doDigitsMatch(expr(...clueArgs),clueDigitsArr);
            }
        );
    } else {
        const otherLetter = lettersObj[otherLettersArr[index]];
        for (let ii = 0; ii < otherLetter.length; ii++) { // iterate through each possible value of otherLetter, and each time do solveClueLoop again and iterate through each possible value of the next otherLetter, until we run out of otherLetters
            const newArgs = [...args];
            newArgs[index] = otherLetter[ii]; // adding the value of the current otherLetter onto the arguments for expr
            const iFilter = solveClueLoop(targetLetter, expr, otherLettersArr, targetLetterIndex, clueDigitsArr, index + 1, newArgs); // repeat this function for the next otherLetter, or, if we've run out of otherLetters to loop through, return an array of possible values that targetLetter can be for the current otherLetter values
            result = [...new Set([...result,...iFilter])]; // new Set takes the result, which starts out empty, and apends iFilter (the possible values of the target letter for the current otherLetter values), ignoring any repeat values
        }
    }
    return result; // return result so that the set of possible values of target letter can be maintained outside of this loop
}

/*
checkAndEliminate does the following:
1) checks if the target letter has 0 possible values, and logs an error if so.
2) checks if the target letter has 1 possible value, and eliminates that value from all other letters if so
3) for each letter with a value eliminated
*/
const checkAndEliminate = (targetLetter /* a string for the target letter, used as a key for lettersObj */) => {
    const targetLetterArr = lettersObj[targetLetter];
    if (targetLetter.length === 0) { // Step 1
        console.log('Error: letter has no possible value remaining.')
    } else if (targetLetterArr.length === 1) { // Step 2
        const currentLetter = targetLetterArr[0];
        letterKeys.forEach(key => { // for each key in letterObj's keys
            const possibleLetterArr = lettersObj[key];
            if (possibleLetterArr.length !== 1) { // if the array of possible values isn't 1 (so ignoring the target letter)
                const index = possibleLetterArr.indexOf(currentLetter);
                if (index > -1) { // if the target letter's remaining value is in this letter's possible values, remove it
                    possibleLetterArr.splice(index,1);
                }
                if (possibleLetterArr.length === 1) {
                    checkAndEliminate(key); // Step 3 (note: this loop is the reason the condition above was "possibleLetterArr.length !== 1", not "value !== targetLetter" - to prevent an infinite recursion)
                }
            }
        });
    }
}

/*
solveCheckAndEliminate does the following:
1) does solveClueLoop on the target letter, and changes the remaining possible values of the target letter to the output
2) does checkAndEliminate on the target letter
*/
const solveCheckAndEliminate = (targetLetter, expr, otherLettersArr, targetLetterIndex, clueDigitsArr) => {
    const result = solveClueLoop(targetLetter, expr, otherLettersArr, targetLetterIndex, clueDigitsArr); // Step 1
    lettersObj[targetLetter] = result;
    checkAndEliminate(targetLetter); // Step 2
}

// logGoodLetters logs all the letters whose number of remaining possible values < a threshold argument, howGood
const logGoodLetters = (howGood) => {
    const goodLettersArr = []; // initialise goodLettersArr as an empty set, which will contain all the 'good letters'
    for (let i = 0; i < letterKeys.length; i++) {
        if (lettersObj[letterKeys[i]].length < howGood) { // if the number of remaining possible values < the threshold
            goodLettersArr.push(Object.entries(lettersObj)[i]); // apend the key and the value of that letter to goodLettersArr
        }
    }
    console.log(goodLettersArr); // log the array
}

// logSolvedClues logs all clues where the solution is known, i.e. where there is only one remaining possible value of each letter in the clue
const logSolvedClues = () => {
    for (let clue in cluesObj) { // for each clue
        const {expr: clueExpr, lettersArr: clueLettersArr} = cluesObj[clue];
        if (clueLettersArr.every(letter => lettersObj[letter].length === 1)) { // if every letter in the clue has one possible value remaining
            const lettersArr = clueLettersArr.map(letter => lettersObj[letter][0]); // lettersArr is an array of those single values
            const clueSol = clueExpr(...lettersArr); // evaluate the solution to the clue
            console.log('The solution to ',clue,' is ',clueSol); // log the solution to the clue
        }
    }
}

/* Stage 1
After one step of this process I get some solutions to clues:

The solution to  acr7  is  16
The solution to  acr15  is  285
The solution to  acr20  is  387
The solution to  acr24  is  72
The solution to  dow2  is  117
The solution to  dow4  is  24
The solution to  dow7  is  19683
The solution to  dow23  is  98

When I fill the solutions into the crossword, some digits of other clues are revealed. I'll add those digits to the clues...
*/

{cluesObj.acr1.digitArr[1] = 1;
cluesObj.acr9.digitArr[1] = 1;
cluesObj.acr10.digitArr[2] = 9;
cluesObj.acr11.digitArr[1] = 7;
cluesObj.acr12.digitArr[3] = 6;
cluesObj.acr14.digitArr[1] = 8;
cluesObj.acr17.digitArr[3] = 3;
cluesObj.acr23.digitArr[0] = 9;
cluesObj.acr25.digitArr[1] = 8;
cluesObj.dow9.digitArr[3] = 2;
cluesObj.dow9.digitArr[6] = 7;
cluesObj.dow13.digitArr[1] = 8;
cluesObj.dow13.digitArr[4] = 2;
cluesObj.dow16.digitArr[0] = 5;
cluesObj.dow8.digitArr[0] = 6;}

/* Stage 2
Here are the next batch of clue solutions; the bulleted ones are new:

The solution to  acr10  is  2198
The solution to  acr11  is  872
The solution to  acr12  is  3896
The solution to  acr14  is  789
The solution to  acr17  is  6383
The solution to  acr20  is  387
The solution to  acr25  is  78968
The solution to  dow4  is  89
The solution to  dow6  is  3197
The solution to  dow8  is  6829877
The solution to  dow9  is  6862197
The solution to  dow13  is  28982
The solution to  dow16  is  5896
The solution to  dow18  is  8389
The solution to  dow21  is  856

*/

{cluesObj.acr1.digitArr[3] = 8;
cluesObj.acr9.digitArr[0] = 6;
cluesObj.acr9.digitArr[3] = 9;
cluesObj.acr13.digitArr[0] = 2;
cluesObj.acr19.digitArr[0] = 9;
cluesObj.acr19.digitArr[1] = 8;
cluesObj.acr22.digitArr = [9,8,9,-1];
cluesObj.dow3.digitArr[2] = 2;
cluesObj.dow12.digitArr = [3,-1,6,-1,-1,7];
cluesObj.dow5.digitArr = [-1,2,8,-1,3,-1];}

/* Stage 3
New clue solutions after this are:

The solution to  acr1  is  61987
The solution to  acr9  is  6119
The solution to  acr13  is  2889
The solution to  acr19  is  9836
The solution to  acr22  is  9898
The solution to  dow5  is  728936
The solution to  dow12  is  386387

Only A, G, R and O are not evaluated
*/

{cluesObj.dow3.digitArr = [9,1,2,8];
cluesObj.acr23.digitArr = [9,8,5,7];}

/* Stage 4
Success - all letters evaluated, and all clues solved
*/

// The following three lines stayed at the bottom of the code for each stage. To replicate my process, comment out everything between "Stage 1" and here and run, then uncomment up to "Stage 2" and run, and so on, but always keep the following uncommented:

iterateSolutionThroughAllClues(5); // run the solver with 5 iterations, which should be more than enough

logGoodLetters(10); // log letters whose number of possible values is < 10

logSolvedClues(); // log all the clues that can now be fully solved