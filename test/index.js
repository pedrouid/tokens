const fs = require('fs')

const pngExp = /\.png$/
const upperCaseExp = /[A-F]/
const OxExp = /^0x/
const addressExp = /[0-9a-f]{40}$/i

const exitWithMsg = msg => {
    console.log(msg)
    process.exit(1)
}

const isAddress = address => addressExp.test(address)
const isFilePng = name => pngExp.test(name)
const remotePngExtension = string => string.replace(/.png$/, '')

const tokens = fs.readdirSync('./tokens')

tokens.forEach(token => {
    const address = remotePngExtension(token)

    if (!isFilePng(token)) {
        exitWithMsg(`${token} image must be png`)
    } 
    
    if (upperCaseExp.test(address)) {
        exitWithMsg(`${address} image must be in lowercase`)
    }

    if (!OxExp.test(address)) {
        exitWithMsg(`'${address}' must start with 0x`)
    }

    if (!isAddress(address)) {
        exitWithMsg(`${address} image must have length 42 instead have ${address.length}`)
    }
})

const checkRootDirectory = () => {
    fs.readdirSync(".").forEach(file => {
        if(isFilePng(file)) {
            exitWithMsg(`Move ${file} to ./tokens folder`)
        }
        
    })

    if(fs.existsSync("./images")) {
        exitWithMsg(`Adding to ./image folder is restricted, please update your fork`)
    }
}
checkRootDirectory()

console.log(`Passed all tests`)
