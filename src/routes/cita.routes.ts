import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
import { Cita } from '../models/Cita';
const router = express.Router();



//create appointment
router.post('/create',authMiddleware, Cita.create);

//edit appointment
router.put('/:id',authMiddleware, Cita.update);

//delete appointment
router.delete('/:id',authMiddleware, Cita.delete);

//get appointments by client
router.get('/client/cita',authMiddleware, Cita.getByLogedClient);

//get appointments by artist
router.get('/tatuador/cita',authMiddleware, Cita.getByLogedArtist);


//PROTECTED ROUTES 

//get all appointments
router.get('/',authMiddleware,authorizeMiddleware(["Admin"]), Cita.getAll);

//get appointmentbyid
router.get('/:id',authMiddleware,authorizeMiddleware(["Admin"]), Cita.getById);

export default router;