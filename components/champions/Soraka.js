const Soraka = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 70 , 110 , 150 , 190 , 230]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (ThisChampion_AP*.35)
                    const Tag = "Soraka calls down a star at the target area, landing after 0.25 - 1 (based on target range) seconds, dealing magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 2) {
                    const Bases = [0, 56 , 64 , 72 , 80 , 88]
                    const Type = "heal"
                    const Max = Bases[PointsQ] + (ThisChampion_AP*.4)
                    const Tag = "Hitting at least one enemy champion grants Soraka Rejuvenation for 4 seconds, during which she can Rejuvenate allies healed by Astral Infusion Astral Infusion. Rejuvenation Heal power heals every 0.5 seconds and grants 10% bonus movement speed when not moving towards enemy champions."
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
                    const Bases = [0 , 80 , 110 , 140 , 170 , 200]
                    const Type = "heal"
                    const Max = Bases[PointsW]+(ThisChampion_AP*.6)
                    const Tag = "Soraka heals the target ally champion."
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
                    const Bases = [0 , 70 , 110 , 150 , 190 , 230]
                    const Type = "magic damage"
                    const Max = Bases[PointsE]+(ThisChampion_AP*.4)
                    const Tag = "Soraka deals magic damage to all enemy champions in an area and creates a zone within that silences enemy champions standing on it."
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
                    const Bases = [0 , 150 , 250 , 350]
                    const Type = "heal"
                    const Enhanced = ThisChampion_healthPercent > .4 ? 1 : 1.5
                    const Max = (Bases[PointsR]+(ThisChampion_AP*.55))*Enhanced
                    const Tag = "Soraka calls upon the stars, healing all allied champions, including untargetable allies, and herself, which is increased by 50% on targets below 40% of their maximum health."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Soraka }