//this is the same for all route modules
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


const history = require('../modules/history'); //bc we are using history in the router rather than server

// get history (and change 'app' to 'router' when in router file)
router.get( '/', ( req, res )=>{
//     console.log( '/math GET hit' );
//     res.send( history );
    //GET data from the database
    let queryText = 'SELECT * FROM "history";';
    pool.query (queryText).then((result) => {
        console.log('result from database', result.rows);
        res.send(result.rows);
    });
}) // end /math GET

// post for new equation (and change 'app' to 'router' when in router file)
router.post( '/', ( req, res )=>{
    console.log( '/math POST hit:', req.body );
    let answer = 0;
    if( req.body.operator === '+' ){
        answer = Number( req.body.input1 ) + Number( req.body.input2 );
    }
    else if( req.body.operator === '-' ){
        answer = Number( req.body.input1 ) - Number( req.body.input2 );
    }
    else if( req.body.operator === '*' ){
        answer = Number( req.body.input1 ) * Number( req.body.input2 );
    }
    else if( req.body.operator === '/' ){
        answer = Number( req.body.input1 ) / Number( req.body.input2 );
    }
    answerObject = {
        answer: answer
    } // sending an object instead of a number to avoid status code collision
    res.send( answerObject );
    // add this calculation to history
    const historyObject = {
        num1: req.body.input1,
        operator: req.body.operator,
        num2: req.body.input2,
        answer: answer
    } // end historyObject
    history.push( historyObject );
    console.log( 'history:', history );
}) // end /math POST


//this is the same for all route modules
module.exports = router;