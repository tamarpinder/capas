# CAPAS Moodle Backend

This directory contains the Docker setup for the CAPAS Moodle Learning Management System.

## Services

- **Moodle**: The main LMS application (accessible on port 8080)
- **MariaDB**: Database server for Moodle
- **phpMyAdmin**: Database management interface (accessible on port 8081)

## Quick Start

1. Ensure Docker and Docker Compose are installed
2. Run the following command from this directory:

```bash
docker-compose up -d
```

3. Access the services:
   - Moodle: http://localhost:8080
   - phpMyAdmin: http://localhost:8081

## Default Credentials

### Moodle Admin
- Username: admin
- Password: CAPASAdmin2024!
- Email: admin@capas.edu.bs

### Database
- Database Name: capas_moodle
- Database User: capas_user
- Database Password: capas_secure_password
- Root Password: root_secure_password

## Important Notes

- Change all default passwords before deploying to production
- The data is persisted in Docker volumes
- To stop the services: `docker-compose down`
- To remove all data: `docker-compose down -v`

## Environment Variables

The following environment variables are used and can be modified in docker-compose.yml:

- `MOODLE_DATABASE_*`: Database connection settings
- `MOODLE_USERNAME/PASSWORD`: Initial admin credentials
- `MOODLE_SITE_NAME`: The name of your Moodle site
- `PHP_MEMORY_LIMIT`: PHP memory allocation

## Backup

To backup the Moodle data:

```bash
docker exec capas-mariadb /bin/bash -c "mysqldump -u root -proot_secure_password capas_moodle > /tmp/backup.sql"
docker cp capas-mariadb:/tmp/backup.sql ./backup.sql
```