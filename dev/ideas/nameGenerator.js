
const vowels = "aeiou".split("");
const consonants = "bcdfghjklmnpqrstvwxyz".split("");

const syllables = [];

const prepareCartesian = (arr1 = [], arr2 = []) => {
    for(let i = 0; i < arr1.length; i++){
        for(let j = 0; j < arr2.length; j++){
            const syllable = arr1[i] + arr2[j];
            if (!syllables.includes(syllable)) {
                syllables.push(syllable);
            }
        }
    };
};

const shuffle = (array) => array.sort(() => 0.5 - Math.random());

prepareCartesian(vowels, consonants);
console.log(syllables);
prepareCartesian(consonants, vowels);
console.log(syllables);
