const Olaf = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_bonusAD, ThisChampion_maxAD) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            //¿Cuantos efectos tiene la habilidad?
            const Effects = 1
            
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 80, 125, 170, 215, 260]
                    const Scaling = [0, 1, 1, 1, 1, 1]
                    const Type = "physical damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_bonusAD)
                    const Tag = "Olaf throws an axe to the target location, dealing physical damage to all enemies it passes through."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
        }
        //E
        else if (ability === "2") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 70, 115, 160, 205, 250 ]
                    const Scaling = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const Type = "true damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_maxAD)
                    const Tag = "Olaf deals true damage to the target enemy."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        else if (ability === "3") {
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Olaf }