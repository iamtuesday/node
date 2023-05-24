const IsPalindromo = (str: string): boolean => {
    const strReverse = str.split('').reverse().join('');
    console.log(str.split(''))
    console.log(str.split('').reverse())
    console.log(str.split('').reverse().join(''))
    return str === strReverse;
}

console.log("isPalindromo('selene')", IsPalindromo('selene'))


const IsPalindromo2 = (str: string): boolean => {
    let i = 0;
    let j = str.length - 1;

    while (i < j) {
        if (str[i] !== str[j]) return false;
        i++;
        j--;
    }
    return true;
}

console.log("isPalindromo2('araña')", IsPalindromo2('araña'))