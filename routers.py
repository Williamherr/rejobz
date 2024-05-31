from rest_framework import routers
from applications.viewsets import ApplicationViewSet

router = routers.SimpleRouter()
router.register(r'application', ApplicationViewSet, basename='application')

urlpatterns = router.urls