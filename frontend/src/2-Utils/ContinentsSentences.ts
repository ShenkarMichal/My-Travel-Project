
enum Sentences {
    Asia = "There should not be a contradiction between development and tradition. Countries like Japan and South Korea have grown their economies greatly while maintaining unique cultures",
    AsiaSrc = "Barack Obama",

    Europe = "A war between Europeans is a civil war.",
    EuropeSrc = "Victor Hugo",

    Antarctica = "The common heritage of mankind.",
    AntarcticaSrc = "Antarctic Treaty",

    Australia = "The soil here is so generous; Tickle her with a hoe and she'll laugh with a crop.",
    AustraliaSrc = "Douglas William Jerrold",

    NorthAmerica = "Our country can be compared to a new home. It lacks many things, but it has the most important thing of all - freedom.",
    NorthAmericaSrc = "James Monroe",

    SouthAmerica = "I want to live like a cultured South American and not kill the Indians like the Europeans",
    SouthAmericaSrc = "Simon Bolivar",

    Africa = "Africa is a complex and diverse land that defies categorization.",
    AfricaSrc = "Léonie Pordie"
}

enum Continents {
    Asia = "Asia",
    Europe = "Europe",
    Antarctica = "Antarctica",
    Australia = "Australia",
    NorthAmerica = "North-America",
    SouthAmerica ="South-America",
    Africa = "Africa"
}

export class ContinentsSentencesModel {
    public sentence: string = null
    public src: string = null

}

function getSentence(continentName: string): ContinentsSentencesModel {

    const sentences = new ContinentsSentencesModel()

    switch (continentName) {
        case Continents.Asia:
            sentences.sentence = Sentences.Asia
            sentences.src = Sentences.AsiaSrc
            break
        case Continents.Europe:
            sentences.sentence = Sentences.Europe
            sentences.src = Sentences.EuropeSrc
            break
        case Continents.Antarctica:
            sentences.sentence = Sentences.Antarctica
            sentences.src = Sentences.AntarcticaSrc
            break
        case Continents.Australia:
            sentences.sentence = Sentences.Australia
            sentences.src = Sentences.AustraliaSrc
            break
        case Continents.NorthAmerica:
            sentences.sentence = Sentences.NorthAmerica
            sentences.src = Sentences.NorthAmericaSrc
            break
        case Continents.SouthAmerica:
            sentences.sentence = Sentences.SouthAmerica
            sentences.src = Sentences.SouthAmericaSrc
            break
        case Continents.Africa:
            sentences.sentence = Sentences.Africa
            sentences.src = Sentences.AfricaSrc
            break
    }

    return sentences
}

export default {
    getSentence
}