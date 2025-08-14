import { Router } from 'express';
import { CarController } from '../controllers/car.controller';
import { validate } from '../middleware/validation.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { searchLimiter } from '../middleware/rate-limit.middleware';
import { 
  getCarsSchema, 
  getCarSchema, 
  searchCarsSchema, 
  getCarBySlugSchema,
  createCarSchema,
  updateCarSchema,
  toggleFavoriteSchema,
  createInquirySchema,
  scheduleTestDriveSchema
} from '../validators/car.validator';

const router = Router();
const carController = new CarController();

// Apply rate limiting to search routes
router.use('/search', searchLimiter);

// Public routes
router.get('/', validate(getCarsSchema), carController.getCars);
router.get('/search', validate(searchCarsSchema), carController.searchCars);
router.get('/stats', carController.getCarStats);
router.get('/brands', carController.getBrands);
router.get('/categories', carController.getCategories);
router.get('/featured', carController.getFeaturedCars);
router.get('/popular', carController.getPopularCars);
router.get('/new', carController.getNewCars);
router.get('/brand/:brand', carController.getCarsByBrand);
router.get('/category/:category', carController.getCarsByCategory);
router.get('/slug/:slug', validate(getCarBySlugSchema), carController.getCarBySlug);
router.get('/:id', validate(getCarSchema), carController.getCarById);

// Routes that require authentication
router.use(authenticate);

// User routes (authenticated users)
router.post('/:id/favorite', validate(toggleFavoriteSchema), carController.toggleFavorite);
router.get('/:id/similar', validate(getCarSchema), carController.getSimilarCars);
router.post('/:id/view', validate(getCarSchema), carController.incrementViewCount);
router.post('/:id/inquiry', validate(createInquirySchema), carController.createInquiry);
router.post('/:id/test-drive', validate(scheduleTestDriveSchema), carController.scheduleTestDrive);

// Dealer/Admin routes (require specific roles)
router.post('/', 
  authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), 
  validate(createCarSchema),
  carController.createCar
);

router.put('/:id', 
  authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), 
  validate(updateCarSchema),
  carController.updateCar
);

router.delete('/:id', 
  authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), 
  validate(getCarSchema),
  carController.deleteCar
);

router.patch('/:id/status', 
  authorize(['ADMIN', 'SUPER_ADMIN']), 
  validate(getCarSchema),
  carController.updateCarStatus
);

// Admin only routes
router.get('/admin/all', 
  authorize(['ADMIN', 'SUPER_ADMIN']), 
  carController.getAllCarsAdmin
);

router.get('/admin/analytics', 
  authorize(['ADMIN', 'SUPER_ADMIN']), 
  carController.getCarAnalytics
);

router.post('/admin/bulk-import', 
  authorize(['ADMIN', 'SUPER_ADMIN']), 
  carController.bulkImportCars
);

router.post('/admin/bulk-update', 
  authorize(['ADMIN', 'SUPER_ADMIN']), 
  carController.bulkUpdateCars
);

export default router;