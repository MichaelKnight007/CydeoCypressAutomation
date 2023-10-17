
//First way, importing from different folder..

import {auth} from '../../support/pages/auth'
/**     here, in js ".." means go to parent
        Here, first we go out of login.js file to pomTest, then to e2e folder. 
        And then we say go to support, then pages,and then auth.
        We imported auth object that we created in auth.js file.
*/

import { navigateTo } from '../../support/pages/navigation'; 
/**
 * When we write import and then 'na' between {}, 
 * it'll write the navigationTo object and the rest of the code itself. 
 * We imported navigationTo object that we created in navigation.js file.
 *  */ 