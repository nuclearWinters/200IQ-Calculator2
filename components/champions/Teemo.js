const Teemo = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 80 , 125 , 170 , 215 , 260]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (ThisChampion_AP*.8)
                    const Tag = "Teemo shoots a dart at the target enemy, dealing them magic damage and Blind icon blinding them for a short duration."
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
                    const Bases = [0 , 24 , 48 , 72 , 96 , 120]
                    const Type = "magic damage"
                    const Max = Bases[PointsE]+(ThisChampion_AP*.4)
                    const Tag = "Poisoned targets suffer magic damage for 4 seconds, with subsequent attacks refreshing the poison's duration."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        else if (ability === "3") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 200 , 325 , 450]
                    const Type = "magic damage"
                    const Max = Bases[PointsR]+(ThisChampion_AP*.5)
                    const Tag = "If an enemy steps on a mushroom, it detonates, poisoning all nearby enemies, slowing them, granting sight of them, and dealing them magic damage over 4 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Teemo }