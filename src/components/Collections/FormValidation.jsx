const validation = (values) => {
    let errors = {};

     if(!values.twitter){
        errors.twitter = "Twitter account is required"
     }else if(!/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/.test(values.twitter)) {
        errors.twitter = "Please provide valid twitter account"
    }
    if(!values.discord) {
        errors.discord = "Discord account is required"
    }else if(!/^https?:\/\/(www\.)?discord\.com\/[a-zA-Z0-9]+\/?$/.test(values.discord)){
        errors.discord = "Provide valid discord account"
    }
    if(!values.instagram) {
        errors.instagram = "Instagram account is required"
    } else if(/^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/.test(values.instagram)) {
        errors.instagram = "Provide valid instagram account"
    }

    return errors;
}

export default validation;