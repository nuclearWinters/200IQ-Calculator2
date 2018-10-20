const NoAbility = (list_effects_all_abilities) => {
    //Sin información importante en pasiva por que se ignora
    const Abilities = 4
    for (let i = 1; i <= Abilities; i++) {
        let list_effect_per_ability = []
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { NoAbility }