const Kayle = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 60 , 110 , 160 , 210 , 260 ]
                    const Scaling = [0, .6, .6, .6, .6, .6]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP) + (ThisChampion_bonusAD*1)
                    const Tag = "Kayle blasts the target enemy, dealing them magic damage and slowing them for 3 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 60 , 105 , 150 , 195 , 240 ]
                    const Scaling = [0, .45, .45, .45, .45, .45]
                    const Type = "heal"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)
                    const Tag = "Kayle blesses the target allied champion or herself, healing them and granting them bonus movement speed for 3 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        else if (ability === "2") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 20 , 30 , 40 , 50 , 60]
                    const Scaling = [0, .2, .25, .3, .35, .4]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (.3*ThisChampion_AP) + (Scaling[PointsE]*ThisChampion_maxAD)
                    const Tag = "For the next 10 seconds, Kayle becomes a ranged champion and her basic attacks gain bonus effects. Kayle's basic attacks deal magic damage to all enemies near the main target, though not against turrets, and apply spell effects."
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

export { Kayle }