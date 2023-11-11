//! Function test of W3OS GCS ( Group Chat Service );

const theme = {
    error: '\x1b[31m%s\x1b[0m',
    success: '\x1b[36m%s\x1b[0m',
    primary: '\x1b[33m%s\x1b[0m',
    dark: '\x1b[90m%s\x1b[0m',
};
const output =(ctx, type, skip) => {
    const stamp = () => { return new Date().toLocaleString(); };
    if (!type || !theme[type]) {
        if (skip) return console.log(ctx);
        console.log(`[${stamp()}] ` + ctx);
    } else {
        if (skip) return console.log(theme[type], ctx);
        console.log(theme[type], `[${stamp()}] ` + ctx);
    }
};

console.clear()

//const ws=new WebSocket(url);
