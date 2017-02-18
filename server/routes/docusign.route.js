import express from 'express';
import validate from 'express-validation';
import xmlparser from 'express-xml-bodyparser';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/listener/:userId')
    .post(xmlparser({ trim: false, explicitArray: false }), userCtrl.docusignListener);

export default router;
