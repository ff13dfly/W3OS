return (function(){
    return {
        mock_saying:(str)=>{
            console.log(`Saying to somebody: ${str}`);
        },
        mock_talking:(str)=>{
            console.log(`Talking to somebody: ${str}`);
        },
        version:"2.0.1",
        server:"wss://goodday.mock.com"
    }
})();