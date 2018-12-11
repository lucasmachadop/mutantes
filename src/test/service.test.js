const serviceModule = require('../service')

describe('#indicaCorretamenteSeDNAPossuiMutacao', () => {
    test('Deve indicar mutacao se possui bases repetidas na vertical 2 vezes', async () => {
        const input = [
            "GGGGCC",
            "AACCCC",
            "CACACA",
            "TGTGTG",
            "CACACA",
            "TGTGTG"]
        const isMutant = await serviceModule.isMutant(input)
        expect(isMutant).toBe(true)
    })

    test('Deve indicar mutacao se possui bases repetidas na horizontal e na vertical', async () => {
        const input = [
            "GGGGCC",
            "AACCCA",
            "CACACA",
            "TGTGTA",
            "CACACA",
            "TGTGTG"]
        const isMutant = await serviceModule.isMutant(input)
        expect(isMutant).toBe(true)
    })

    test('Deve indicar mutacao se possui bases repetidas obliquamente e na vertical',async () => {
        const input = [
            "GGCGCC",
            "AACCCA",
            "CAGACA",
            "TGTGTA",
            "CACAGA",
            "TGTGTG"]
        const isMutant = await serviceModule.isMutant(input)
        expect(isMutant).toBe(true)
    })

    test('Nao deve indicar mutacao se possui apenas uma sequencia de bases repetidas', async () => {
        const input = [
            "GGCGCC",
            "AACCCA",
            "CACACA",
            "TGTGTA",
            "CACACA",
            "TGTGTG"]
        const isMutant = await serviceModule.isMutant(input)
        expect(isMutant).toBe(false)
    })

    test('Nao deve indicar mutacao se nao possui sequencia de bases repetidas nenhuma vez', async () => {
        const input = [
            "CACACA",
            "TGTGTG",
            "CACACA",
            "TGTGTG",
            "CACACA",
            "TGTGTG"]
        const isMutant = await serviceModule.isMutant(input)
        expect(isMutant).toBe(false)
    })
})

