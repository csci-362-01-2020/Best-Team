<script>
    const fsLibrary = require('fs')

    let data = 'hello there'
    
    fsLibrary.writeFile('../projects/MarsMapMaker-1/src/__tests__/testRunner.js', data, (error) => {
        if (error) throw err;
    })
<script/>