const integerValidation = [
    (value:any) =>{
        const pattern = /^[0-9]*$/
          return pattern.test(value) || 'Invalid e-mail.'

    }
]

export  {
    integerValidation
}