const Fiddlesticks = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
        }
        //W
        else if (ability === "1") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 400 , 525 , 650 , 775 , 900]
                    const BasesMin = [0, 80 , 105 , 130 , 155 , 180]
                    const Scaling = [0, 2.25, 2.25, 2.25, 2.25, 2.25]
                    const ScalingMin = [0, .45, .45, .45, .45, .45]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)
                    const Min = BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_AP)
                    const Tag = "Fiddlesticks tethers himself to the target enemy and channels for up to 5 seconds. While channeling, Fiddlesticks deals magic damage each second."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const Bases = [0, 400 , 525 , 650 , 775 , 900]
                    const BasesMin = [0, 80 , 105 , 130 , 155 , 180]
                    const Scaling = [0, 2.25, 2.25, 2.25, 2.25, 2.25]
                    const ScalingMin = [0, .45, .45, .45, .45, .45]
                    const HealScaling = [0, .60 , .65 , .70 , .75 , .80]
                    const Type = "heal"
                    const Max = ((Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP))*EnemyChampion_magicDamageReduction)*(HealScaling[PointsW])
                    const Min = ((BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_AP))*EnemyChampion_magicDamageReduction)*(HealScaling[PointsW])
                    const Tag = "Heals himself for a percentage of the damage done."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
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
                    const Bases = [0, 195 , 255 , 315 , 375 , 435]
                    const BasesMin = [0, 65 , 85 , 105 , 125 , 145]
                    const Scaling = [0, 1.35, 1.35, 1.35, 1.35, 1.35]
                    const ScalingMin = [0, 0.45, 0.45, 0.45, 0.45, 0.45]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Min = BasesMin[PointsE] + (ScalingMin[PointsE]*ThisChampion_AP)
                    const Tag = "Fiddlesticks sends a crow to the target enemy that bounces to nearby enemies up to 5 times, prioritizing targets not yet hit or targets affected by Drain, dealing magic damage with each bounce and silencing them for 1.25 seconds once."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        else if (ability === "3") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 625 , 1125 , 1625]
                    const BasesMin = [0, 125 , 225 , 325]
                    const Scaling = [0, 2.25, 2.25, 2.25]
                    const ScalingMin = [0, 0.45, 0.45, 0.45]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Min = BasesMin[PointsR] + (ScalingMin[PointsR]*ThisChampion_AP)
                    const Tag = "After channeling for 1.5 seconds, Fiddlesticks blinks to the target location with a murder of crows flying wildly around him for 5 seconds, dealing magic damage to nearby enemies each second."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Fiddlesticks }