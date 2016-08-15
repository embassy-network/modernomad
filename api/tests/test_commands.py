from django.test import TestCase
from core.factories import *
from api.commands import *
from core.models import *


class AddAvailabilityChangeTestCase(TestCase):
    def setUp(self):
        self.user = None
        self.resource = ResourceFactory()

    def test_that_command_with_valid_data_creates_an_availability(self):
        command = AddAvailabilityChange(self.user, start_date="4016-01-13", resource=self.resource.pk, quantity=2)

        if not command.execute():
            print command.result()
            self.assertTrue(False)

        availability = Availability.objects.filter(resource=self.resource).last()
        self.assertTrue(availability)
        self.assertEqual(availability.quantity, 2)
        self.assertEqual(availability.start_date, datetime.date(4016, 1, 13))

        expected_data = {'quantity': 2, 'resource': self.resource.pk, 'id': availability.pk, 'start_date': '4016-01-13'}
        self.assertEqual(command.result().serialize(), expected_data)

    def test_that_a_date_in_the_past_fails(self):
        command = AddAvailabilityChange(self.user, start_date="1016-01-13", resource=self.resource.pk, quantity=2)

        self.assertFalse(command.execute())

        # expected_data = {'errors': {'start_date': ['The start date must not be in the past']}}
        # self.assertEqual(command.result().serialize(), expected_data)