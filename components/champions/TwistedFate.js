const TwistedFate = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_maxAD) => {
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
                    const Bases = [0, 60 , 105 , 150 , 195 , 240]
                    const Scaling = [0, 0.65, 0.65, 0.65, 0.65, 0.65]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                    const Tag = "Twisted Fate throws three cards in a cone, dealing magic damage to all enemies they pass through."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        if (ability === "1") {
            const Effects = 3
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 40 , 60 , 80 , 100 , 120]
                    const Scaling = [0, 1, 1, 1, 1, 1]
                    const Scaling1 = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_maxAD) + (Scaling1[PointsW]*ThisChampion_AP)
                    const Tag = "SECOND CAST - BLUE CARD: Restores mana."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                else if (i === 2) {
                    const Bases = [0, 30 , 45 , 60 , 75 , 90]
                    const Scaling = [0, 1, 1, 1, 1, 1]
                    const Scaling1 = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_maxAD) + (Scaling1[PointsW]*ThisChampion_AP)
                    const Tag = "SECOND CAST - RED CARD: Deals magic damage around the target and slows all enemies hit for 2.5 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Tercer efecto
                else if (i === 3) {
                    const Bases = [0, 15 , 22.5 , 30 , 37.5 , 45 ]
                    const Scaling = [0, 1, 1, 1, 1, 1]
                    const Scaling1 = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_maxAD) + (Scaling1[PointsW]*ThisChampion_AP)
                    const Tag = "SECOND CAST - GOLD CARD: Stuns the target."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        if (ability === "2") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 55 , 80 , 105 , 130 , 155 ]
                    const Scaling = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "Every fourth basic attack deals bonus magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        if (ability === "3") {
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { TwistedFate }