import { Router } from 'express';
import { CarController } from '../controllers/car.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { rateLimiter } from '../middlewares/rate-limit.middleware';
import { 
  FilterCarsDto, 
  CreateCarDto, 
  UpdateCarDto,
  GetCarByIdDto,
  GetCarsByBrandDto,
  GetCarBySlugDto,
  GetCarsByCategoryDto,
  CreateInquiryDto,
  CreateTestDriveDto
} from '../../application/dtos/car.dto';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

const router = Router();
const prismaService = new PrismaService();
const carController = new CarController(prismaService);

// Apply rate limiting to search routes
router.use('/search', rateLimiter);

// Public routes
router.get('/', validateRequest(FilterCarsDto), carController.getCars);
router.get('/:id', validateRequest(GetCarByIdDto), carController.getCarById);
router.get('/brand/:brand', validateRequest(GetCarsByBrandDto), carController.getCarsByBrand);
router.get('/slug/:slug', validateRequest(GetCarBySlugDto), carController.getCarBySlug);
router.get('/category/:categoryId', validateRequest(GetCarsByCategoryDto), carController.getCarsByCategory);

// Protected routes
router.use(authenticate);

// User routes
router.post('/:id/favorite', validateRequest(GetCarByIdDto), carController.toggleFavorite);
router.post('/:id/view', validateRequest(GetCarByIdDto), carController.incrementViewCount);
router.post('/:id/inquiry', validateRequest(CreateInquiryDto), carController.createInquiry);
router.post('/:id/test-drive', validateRequest(CreateTestDriveDto), carController.scheduleTestDrive);

// Admin & Dealer routes
router.post('/', authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), validateRequest(CreateCarDto), carController.createCar);
router.patch('/:id', authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), validateRequest(UpdateCarDto), carController.updateCar);
router.delete('/:id', authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), validateRequest(GetCarByIdDto), carController.deleteCar);
  validateRequest(CreateCarDto),
  carController.createCar
  
router.put('/:id', 
  authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), 
  validateRequest(UpdateCarDto),
  carController.updateCar
);

router.delete('/:id', 
  authorize(['DEALER', 'ADMIN', 'SUPER_ADMIN']), 
  validateRequest(GetCarByIdDto),
  carController.deleteCar
);

router.patch('/:id/status', 
  authorize(['ADMIN', 'SUPER_ADMIN']), 
  validateRequest(GetCarByIdDto),
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