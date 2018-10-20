const Vladimir = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            //¿Cuantos efectos tiene la habilidad?
            const Effects = 4
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const BasesMax = [0, 80 , 100 , 120 , 140 , 160]
                    const ScalingMax = [0, .6, .6, .6, .6, .6]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsQ] + (ScalingMax[PointsQ]*ThisChampion_AP)
                    const Tag = "After a 0.25-second delay Vladimir drains the lifeforce of the target enemy, dealing magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const BasesMax = [0, 20 , 25 , 30 , 35 , 40]
                    const ScalingMax = [0, .35, .35, .35, .35, .35]
                    const Type = "heal"
                    const Max = BasesMax[PointsQ] + (ScalingMax[PointsQ]*ThisChampion_AP)
                    const Tag = "And healing himself."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 3) {
                    const BasesMax = [0, 148 , 185 , 222 , 259 , 296 ]
                    const ScalingMax = [0, 1.11, 1.11, 1.11, 1.11, 1.11]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsQ] + (ScalingMax[PointsQ]*ThisChampion_AP)
                    const Tag = "CRIMSON RUSH: Transfusion deals 85% increased damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 4) {
                    const BasesMax = [0, 30 , 40 , 50 , 60 , 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
                    const Type = "heal"
                    const Max = BasesMax[ThisChampion_lv] + ((ThisChampion_maxHealth - ThisChampion_currentHealth)*(.05+(ThisChampion_AP/10000)))
                    const Tag = "CRIMSON RUSH: Heals for an additional 30 - 200 (based on level) (+ 5% (+ 4% per 100 AP) missing health)."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 80 , 135 , 190 , 245 , 300]
                    const BasesMin = [0, 20 , 33.75 , 47.5 , 61.25 , 75]
                    const Scaling = [0, .1, .1, .1, .1, .1]
                    const ScalingMin = [0, .025, .025, .025, .025, .025]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_bonusHealth)
                    const Min = BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_bonusHealth)
                    const Tag = "Enemies who stand upon the pool are slowed by 40% and dealt magic damage every half second."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const Bases = [0, 80 , 135 , 190 , 245 , 300]
                    const BasesMin = [0, 20 , 33.75 , 47.5 , 61.25 , 75]
                    const Scaling = [0, .1, .1, .1, .1, .1]
                    const ScalingMin = [0, .025, .025, .025, .025, .025]
                    const Type = "heal"
                    const Max = ((Bases[PointsW] + (Scaling[PointsW]*ThisChampion_bonusHealth))*EnemyChampion_magicDamageReduction)*.15*5
                    const Min = ((BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_bonusHealth))*EnemyChampion_magicDamageReduction)*.15
                    const Tag = "while Vladimir heals himself for 15% of the damage dealt."
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
                    const Bases = [0, 60 , 90 , 120 , 150 , 180]
                    const BasesMin = [0, 30 , 45 , 60 , 75 , 90]
                    const Scaling = [0, 0.8, 0.8, 0.8, 0.8, 0.8]
                    const ScalingMin = [0, 0.35, 0.35, 0.35, 0.35, 0.35]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP) + (ThisChampion_maxHealth*.06)
                    const Min = BasesMin[PointsE] + (ScalingMin[PointsE]*ThisChampion_AP) + (ThisChampion_maxHealth*.025)
                    const Tag = "SECOND CAST: Vladimir unleashes a nova of blood bolts, each of which collide with the first enemy they hit, dealing them magic damage that is increased the longer Tides of Blood was charged, up to the first second."
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
                    const Bases = [0, 150 , 250 , 350]
                    const Scaling = [0, 0.7, 0.7, 0.7]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "Vladimir infects all enemies in the target area with a virulent plague, increasing the damage they take from all sources by 10% for 4 seconds, after which all infected enemies take magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const Bases = [0, 450 , 750 , 1050]
                    const BasesMin = [0, 150 , 250 , 350]
                    const Scaling = [0, 2.1, 2.1, 2.1, 2.1, 2.1]
                    const ScalingMin = [0, 0.7, 0.7, 0.7]
                    const Type = "heal"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Min = BasesMin[PointsR] + (ScalingMin[PointsR]*ThisChampion_AP)
                    const Tag = "Vladimir is healed for every champion damaged by the detonation, reduced to 50% after the first."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Vladimir }