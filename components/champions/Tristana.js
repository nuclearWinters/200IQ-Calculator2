const Tristana = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
        }
        //W
        else if (ability === "1") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 85 , 135 , 185 , 235 , 285]
                    const Type = "magic damage"
                    const Max = Bases[PointsW]+(ThisChampion_AP*.5)
                    const Tag = "Tristana Dash dashes to the target location, dealing magic damage to all nearby enemies on impact."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        else if (ability === "2") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 50 , 75 , 100 , 125 , 150]
                    const Type = "magic damage"
                    const Max = Bases[PointsE]+(ThisChampion_AP*.25)
                    const Tag = "Enemies explode when slain by Tristana's basic attacks, dealing magic damage to all nearby enemies."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const Bases = [0 , 132 , 154 , 176 , 198 , 220]
                    const BasesMin = [0 , 60 , 70 , 80 , 90 , 100]
                    const Scaling = [0 , 1.10 , 1.43 , 1.76 , 2.09 , 2.42]
                    const ScalingMin = [0 , .50 , .65 , .80 , .95 , 1.10]
                    const Type = "physical damage"
                    const Max = Bases[PointsE]+(ThisChampion_bonusAD*Scaling[PointsE])+(ThisChampion_AP*1.1)
                    const Min = BasesMin[PointsE]+(ThisChampion_bonusAD*ScalingMin[PointsE])+(ThisChampion_AP*.5)
                    const Tag = "Tristana places an explosive charge on the target enemy or enemy turret. After 4 seconds the charge explodes, dealing Attack damage physical damage to nearby enemies. The explosion radius is doubled when used on a turret. Tristana's basic attacks and abilities against the target increase Explosive Charge's damage by 30%, stacking up to 4 times for a maximum 120% increase, upon which the charge also detonates instantly."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
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
                    const Bases = [0 , 300 , 400 , 500]
                    const Type = "magic damage"
                    const Max = Bases[PointsR]+(ThisChampion_AP*1)
                    const Tag = "Tristana fires a massive cannonball at the target enemy, dealing magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Tristana }